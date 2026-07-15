---
// PDFViewer.svelte - 使用 PDF.js 渲染 PDF 文档（优化版）
---

<script>
  import { onMount } from 'svelte';

  let { url, height = 800 } = $props();
  let canvas = $state();
  let pdfDoc = $state(null);
  let currentPage = $state(1);
  let totalPages = $state(0);
  let scale = $state(1.5);
  let loading = $state(true);
  let error = $state(null);
  let loadProgress = $state(0);
  let isFullscreen = $state(false);
  let searchText = $state('');
  let searchResults = $state([]);
  let currentSearchIndex = $state(-1);
  let pageInputValue = $state('1');
  let viewerRef = $state();

  onMount(async () => {
    try {
      // 动态导入 PDF.js
      const pdfjsLib = await import('pdfjs-dist');

      // 设置 worker - 使用本地文件
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).href;

      // 加载 PDF 文档（带进度回调）
      const loadingTask = pdfjsLib.getDocument({
        url: url,
      });

      loadingTask.onProgress = (progress) => {
        if (progress.total > 0) {
          loadProgress = Math.round((progress.loaded / progress.total) * 100);
        }
      };

      pdfDoc = await loadingTask.promise;
      totalPages = pdfDoc.numPages;

      // 渲染第一页
      await renderPage(currentPage);
      loading = false;

      // 添加键盘事件监听
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    } catch (err) {
      console.error('PDF 加载失败:', err);
      error = err.message;
      loading = false;
    }
  });

  // 键盘快捷键处理
  function handleKeydown(e) {
    if (e.target.tagName === 'INPUT') return;

    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevPage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextPage();
        break;
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
    }
  }

  async function renderPage(pageNum) {
    if (!pdfDoc) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: scale, rotation: 0 });

      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('页面渲染失败:', err);
      error = err.message;
    }
  }

  async function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      currentPage = pageNum;
      pageInputValue = String(pageNum);
      loading = true;
      await renderPage(currentPage);
      loading = false;
    }
  }

  function handlePageInput(e) {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      goToPage(value);
    } else {
      pageInputValue = String(currentPage);
    }
  }

  async function nextPage() {
    await goToPage(currentPage + 1);
  }

  async function prevPage() {
    await goToPage(currentPage - 1);
  }

  async function zoomIn() {
    scale = Math.min(scale + 0.25, 3);
    loading = true;
    await renderPage(currentPage);
    loading = false;
  }

  async function zoomOut() {
    if (scale > 0.5) {
      scale = Math.max(scale - 0.25, 0.5);
      loading = true;
      await renderPage(currentPage);
      loading = false;
    }
  }

  async function fitWidth() {
    if (!canvas || !pdfDoc) return;
    const page = await pdfDoc.getPage(currentPage);
    const viewport = page.getViewport({ scale: 1 });
    const containerWidth = canvas.parentElement.clientWidth - 32;
    scale = containerWidth / viewport.width;
    loading = true;
    await renderPage(currentPage);
    loading = false;
  }

  // 全屏功能
  async function toggleFullscreen() {
    if (!viewerRef) return;

    if (!document.fullscreenElement) {
      try {
        await viewerRef.requestFullscreen();
        isFullscreen = true;
      } catch (err) {
        console.error('全屏失败:', err);
      }
    } else {
      await document.exitFullscreen();
      isFullscreen = false;
    }
  }

  // 监听全屏状态变化
  if (typeof document !== 'undefined') {
    document.addEventListener('fullscreenchange', () => {
      isFullscreen = !!document.fullscreenElement;
    });
  }

  // 打印功能
  async function handlePrint() {
    if (!pdfDoc) return;

    try {
      // 创建一个隐藏的 iframe 用于打印
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('请允许弹出窗口以使用打印功能');
        return;
      }

      // 设置打印窗口的基本样式
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>打印 PDF</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: white;
            }
            canvas {
              max-width: 100%;
              height: auto;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              canvas {
                max-width: 100%;
                height: auto;
              }
            }
          </style>
        </head>
        <body>
          <canvas id="printCanvas"></canvas>
          <script>
            // 等待图片加载完成后打印
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          <\/script>
        </body>
        </html>
      `);

      // 渲染当前页面到打印窗口的 canvas
      const printCanvas = printWindow.document.getElementById('printCanvas');
      const printContext = printCanvas.getContext('2d');

      // 获取当前页面
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: 2 }); // 使用更高分辨率

      printCanvas.height = viewport.height;
      printCanvas.width = viewport.width;

      // 渲染页面
      await page.render({
        canvasContext: printContext,
        viewport: viewport
      }).promise;

    } catch (err) {
      console.error('打印失败:', err);
      alert('打印失败: ' + err.message);
    }
  }

  // 搜索功能
  async function handleSearch() {
    if (!searchText.trim() || !pdfDoc) {
      searchResults = [];
      currentSearchIndex = -1;
      return;
    }

    searchResults = [];
    currentSearchIndex = -1;

    for (let i = 1; i <= totalPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items.map(item => item.str).join(' ');

      if (text.toLowerCase().includes(searchText.toLowerCase())) {
        searchResults.push(i);
      }
    }

    if (searchResults.length > 0) {
      currentSearchIndex = 0;
      await goToPage(searchResults[0]);
    }
  }

  function nextSearchResult() {
    if (searchResults.length === 0) return;
    currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
    goToPage(searchResults[currentSearchIndex]);
  }

  function prevSearchResult() {
    if (searchResults.length === 0) return;
    currentSearchIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    goToPage(searchResults[currentSearchIndex]);
  }

  // 触摸手势支持
  let touchStartX = 0;
  let touchStartY = 0;
  let initialPinchDistance = 0;
  let initialScale = 1;

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      initialPinchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = scale;
    }
  }

  function handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = currentDistance / initialPinchDistance;
      scale = Math.max(0.5, Math.min(3, initialScale * scaleFactor));
    }
  }

  async function handleTouchEnd(e) {
    if (e.changedTouches.length === 1 && e.touches.length === 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          await prevPage();
        } else {
          await nextPage();
        }
      }
    }

    if (initialPinchDistance > 0) {
      initialPinchDistance = 0;
      loading = true;
      await renderPage(currentPage);
      loading = false;
    }
  }
</script>

<div
  class="pdf-viewer"
  class:fullscreen={isFullscreen}
  style="{isFullscreen ? '' : `height: ${height}px`}"
  bind:this={viewerRef}
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
>
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>加载中... {loadProgress > 0 ? `${loadProgress}%` : ''}</p>
      {#if loadProgress > 0}
        <div class="progress-bar">
          <div class="progress-fill" style="width: {loadProgress}%"></div>
        </div>
      {/if}
    </div>
  {/if}

  {#if error}
    <div class="error">
      <p>❌ 加载失败: {error}</p>
      <a href={url} download>点击下载 PDF</a>
    </div>
  {/if}

  <div class="toolbar" class:toolbar-hidden={loading || error}>
    <div class="toolbar-left">
      <div class="page-controls">
        <button onclick={prevPage} disabled={currentPage <= 1} title="上一页 (←)">
          ◀
        </button>
        <div class="page-input-wrapper">
          <input
            type="number"
            bind:value={pageInputValue}
            onblur={handlePageInput}
            onkeydown={(e) => e.key === 'Enter' && handlePageInput(e)}
            min="1"
            max={totalPages}
            class="page-input"
          />
          <span class="page-total">/ {totalPages}</span>
        </div>
        <button onclick={nextPage} disabled={currentPage >= totalPages} title="下一页 (→)">
          ▶
        </button>
      </div>
    </div>

    <div class="toolbar-center">
      <div class="search-box">
        <input
          type="text"
          bind:value={searchText}
          onkeydown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="搜索文档..."
          class="search-input"
        />
        <button onclick={handleSearch} class="search-btn" title="搜索">
          🔍
        </button>
        {#if searchResults.length > 0}
          <div class="search-nav">
            <button onclick={prevSearchResult} title="上一个">◀</button>
            <span>{currentSearchIndex + 1}/{searchResults.length}</span>
            <button onclick={nextSearchResult} title="下一个">▶</button>
          </div>
        {/if}
      </div>
    </div>

    <div class="toolbar-right">
      <div class="zoom-controls">
        <button onclick={zoomOut} title="缩小 (-)">🔍-</button>
        <span class="zoom-level">{Math.round(scale * 100)}%</span>
        <button onclick={zoomIn} title="放大 (+)">🔍+</button>
        <button onclick={fitWidth} title="适应宽度" class="fit-btn">↔</button>
      </div>

      <div class="action-buttons">
        <button onclick={toggleFullscreen} title="全屏" class="fullscreen-btn">
          {isFullscreen ? '✕' : '⛶'}
        </button>
        <button onclick={handlePrint} title="打印" class="print-btn">
          🖨️
        </button>
        <a href={url} download class="download-btn" title="下载">
          📥
        </a>
      </div>
    </div>
  </div>

  <div class="canvas-container" class:canvas-hidden={loading || error}>
    <canvas bind:this={canvas}></canvas>
  </div>

  {#if !loading && !error}
    <div class="shortcut-hint">
      快捷键: ← → 翻页 | + - 缩放
    </div>
  {/if}
</div>

<style>
  .pdf-viewer {
    border: 1px solid var(--line-divider, #e5e7eb);
    border-radius: 12px;
    overflow: hidden;
    background: white;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .pdf-viewer.fullscreen {
    border-radius: 0;
    height: 100vh !important;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1px solid var(--line-divider, #e5e7eb);
    flex-wrap: wrap;
    gap: 8px;
  }

  .toolbar-hidden {
    display: none;
  }

  .toolbar-left,
  .toolbar-center,
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .toolbar-center {
    flex: 1;
    justify-content: center;
    min-width: 200px;
  }

  .page-controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-input-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-input {
    width: 45px;
    padding: 4px 6px;
    border: 1px solid var(--line-divider, #d1d5db);
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
  }

  .page-input::-webkit-inner-spin-button,
  .page-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .page-total {
    font-size: 13px;
    color: #6b7280;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 4px;
    background: white;
    border: 1px solid var(--line-divider, #d1d5db);
    border-radius: 6px;
    padding: 2px;
  }

  .search-input {
    border: none;
    padding: 4px 8px;
    font-size: 13px;
    width: 120px;
    outline: none;
  }

  .search-btn {
    padding: 4px 8px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .search-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    padding-left: 4px;
    border-left: 1px solid var(--line-divider, #e5e7eb);
    font-size: 12px;
    color: #6b7280;
  }

  .search-nav button {
    padding: 2px 4px;
    font-size: 10px;
  }

  .zoom-controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .zoom-level {
    font-size: 12px;
    color: #6b7280;
    min-width: 40px;
    text-align: center;
  }

  .fit-btn {
    font-size: 16px;
    padding: 4px 6px;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .fullscreen-btn {
    font-size: 18px;
    padding: 4px 8px;
  }

  .print-btn {
    font-size: 16px;
    padding: 4px 8px;
  }

  button {
    padding: 6px 10px;
    border: 1px solid var(--line-divider, #d1d5db);
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
  }

  button:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .download-btn {
    padding: 6px 10px;
    background: var(--primary, #3b82f6);
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-size: 14px;
    transition: opacity 0.2s;
  }

  .download-btn:hover {
    opacity: 0.9;
  }

  .canvas-container {
    flex: 1;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 16px;
    background: #f1f5f9;
    min-height: 200px;
  }

  .canvas-hidden {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  canvas {
    max-width: 100%;
    height: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .loading,
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    color: #6b7280;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top-color: var(--primary, #3b82f6);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .progress-bar {
    width: 200px;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--primary, #3b82f6);
    transition: width 0.3s ease;
  }

  .error a {
    color: var(--primary, #3b82f6);
    text-decoration: underline;
  }

  .shortcut-hint {
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 11px;
    color: #9ca3af;
    background: rgba(255, 255, 255, 0.9);
    padding: 4px 8px;
    border-radius: 4px;
  }

  /* 暗色模式支持 */
  :global(.dark) .pdf-viewer {
    border-color: #374151;
  }

  :global(.dark) .toolbar {
    background: #1f2937;
    border-color: #374151;
  }

  :global(.dark) .search-box {
    background: #374151;
    border-color: #4b5563;
  }

  :global(.dark) .search-input {
    background: transparent;
    color: #e5e7eb;
  }

  :global(.dark) button {
    background: #374151;
    border-color: #4b5563;
    color: #e5e7eb;
  }

  :global(.dark) button:hover:not(:disabled) {
    background: #4b5563;
  }

  :global(.dark) .canvas-container {
    background: #111827;
  }

  :global(.dark) .loading,
  :global(.dark) .error {
    color: #9ca3af;
  }

  :global(.dark) .shortcut-hint {
    background: rgba(0, 0, 0, 0.9);
    color: #6b7280;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .toolbar {
      flex-direction: column;
      gap: 8px;
    }

    .toolbar-left,
    .toolbar-center,
    .toolbar-right {
      width: 100%;
      justify-content: center;
    }

    .search-input {
      width: 100px;
    }

    .shortcut-hint {
      display: none;
    }
  }
</style>
