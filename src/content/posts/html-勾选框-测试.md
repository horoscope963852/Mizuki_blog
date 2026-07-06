---
title: "HTML 勾选框 测试"
published: 2025-11-04
description: "独立HTML勾选框组件的样式测试"
tags: ["HTML", "CSS", "前端", "测试"]
category: "技术"
draft: true
---

独立勾选框组件示例
    
        /* 重置样式 - 仅影响组件内部 */
        .checkbox-component *,
        .checkbox-component *::before,
        .checkbox-component *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* 主容器样式 - 完全独立 */
        .checkbox-component {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 700px;
            width: 100%;
            margin: 20px auto;
            border: 1px solid #e0e0e0;
        }

        .checkbox-component h2 {
            color: #333;
            margin-bottom: 10px;
            text-align: center;
            font-size: 1.8rem;
        }

        .checkbox-component .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 1rem;
        }

        /* 基础复选框样式 */
        .checkbox-component .checkbox-section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        .checkbox-component .section-title {
            font-size: 1.1rem;
            color: #444;
            margin-bottom: 15px;
            font-weight: 600;
        }

        /* 样式1：默认美化版 */
        .checkbox-component .checkbox-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .checkbox-component .checkbox-wrapper:hover {
            transform: translateX(5px);
        }

        .checkbox-component .checkbox-wrapper input[type="checkbox"] {
            display: none;
        }

        .checkbox-component .custom-checkbox {
            width: 22px;
            height: 22px;
            border: 2px solid #667eea;
            border-radius: 6px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            position: relative;
            flex-shrink: 0;
        }

        .checkbox-component .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-color: #667eea;
            animation: checkPulse 0.4s ease;
        }

        .checkbox-component .custom-checkbox::after {
            content: '✓';
            color: white;
            font-size: 14px;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
        }

        .checkbox-component .checkbox-wrapper input[type="checkbox"]:checked + .custom-checkbox::after {
            opacity: 1;
            transform: scale(1);
        }

        @keyframes checkPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .checkbox-component .checkbox-label {
            font-size: 15px;
            color: #333;
            user-select: none;
        }

        /* 样式2：开关式 */
        .checkbox-component .switch-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .checkbox-component .switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
            margin-right: 15px;
        }

        .checkbox-component .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .checkbox-component .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 24px;
        }

        .checkbox-component .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        .checkbox-component .switch input:checked + .slider {
            background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .checkbox-component .switch input:checked + .slider:before {
            transform: translateX(24px);
        }

        /* 样式3：动画心形 */
        .checkbox-component .heart-checkbox {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .checkbox-component .heart-checkbox input[type="checkbox"] {
            display: none;
        }

        .checkbox-component .heart-label {
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .checkbox-component .heart-icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
            position: relative;
            transform: rotate(-45deg);
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .checkbox-component .heart-icon::before,
        .checkbox-component .heart-icon::after {
            content: '';
            width: 24px;
            height: 24px;
            position: absolute;
            left: 14px;
            top: 0;
            background: #ff6b6b;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .checkbox-component .heart-icon::after {
            left: 0;
            top: -14px;
        }

        .checkbox-component .heart-checkbox input[type="checkbox"]:checked ~ .heart-label .heart-icon::before,
        .checkbox-component .heart-checkbox input[type="checkbox"]:checked ~ .heart-label .heart-icon::after {
            background: #ff4757;
            animation: heartBeat 0.8s ease;
        }

        .checkbox-component .heart-checkbox input[type="checkbox"]:not(:checked) ~ .heart-label .heart-icon::before,
        .checkbox-component .heart-checkbox input[type="checkbox"]:not(:checked) ~ .heart-label .heart-icon::after {
            background: #ddd;
        }

        @keyframes heartBeat {
            0%, 100% { transform: scale(1) rotate(-45deg); }
            25% { transform: scale(1.3) rotate(-45deg); }
            50% { transform: scale(1.1) rotate(-45deg); }
            75% { transform: scale(1.2) rotate(-45deg); }
        }

        /* 状态显示区域 */
        .checkbox-component .status-area {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 20px;
            border-radius: 10px;
            margin-top: 25px;
            color: white;
        }

        .checkbox-component .status-title {
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .checkbox-component .status-item {
            padding: 8px;
            margin: 5px 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
        }

        .checkbox-component .status-item:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateX(5px);
        }

        .checkbox-component .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 10px;
            background: #fff;
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .checkbox-component .status-item.checked .status-indicator {
            background: #4caf50;
            box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        }

        .checkbox-component .status-item.unchecked .status-indicator {
            background: #f44336;
        }

        /* 全选按钮 */
        .checkbox-component .select-all-section {
            text-align: center;
            margin: 25px 0;
        }

        .checkbox-component .btn {
            padding: 10px 25px;
            font-size: 14px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 8px;
            font-weight: 600;
        }

        .checkbox-component .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .checkbox-component .btn-secondary {
            background: #e0e0e0;
            color: #333;
        }

        .checkbox-component .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .checkbox-component .btn:active {
            transform: translateY(0);
        }

        /* 响应式设计 */
        @media (max-width: 600px) {
            .checkbox-component {
                padding: 20px;
                margin: 10px;
            }

            .checkbox-component h2 {
                font-size: 1.5rem;
            }

            .checkbox-component .checkbox-wrapper {
                font-size: 14px;
            }
        }

        /* 通知样式 - 仅在组件内生效 */
        .checkbox-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    

    
    
        
# 网站其他内容

        
这是网页的其他部分，不会受到勾选框组件的影响。

        普通按钮
    

    
    
        
## 🎯 交互式勾选框

        
点击下方不同的勾选框体验各种交互效果

        
        
            
### 📌 标准复选框

            
                
                
                我已阅读并同意服务条款
            
            
                
                
                订阅邮件通知
            
            
                
                
                参与用户调研
            
        

        
        
            
### 🔘 开关式复选框

            
                
                    
                    
                
                开启深色模式
            
            
                
                    
                    
                
                启用桌面通知
            
            
                
                    
                    
                
                自动保存草稿
            
        

        
        
            
### ❤️ 收藏式复选框

            
                
                
                    
                    收藏这篇文章
                
            
            
                
                
                    
                    关注作者
                
            
        

        
        
            全选
            取消全选
            反选
        

        
        
            📊 实时状态监控
            
                
            
        
    

    
    
        
## 另一个内容区域

        
这里的内容完全独立，不受上方勾选框组件的影响。

    

    
    
        
## 📋 独立组件实例 2

        
每个组件都是完全独立的

        
            
### 🔔 通知设置

            
                
                
                接收系统通知
            
            
                
                    
                    
                
                邮件提醒
            
        

        
            📊 组件2状态
            
                
            
        
    

    
        // 组件管理器 - 确保每个组件独立运行
        class CheckboxComponentManager {
            constructor(componentId) {
                this.component = document.getElementById(componentId);
                if (!this.component) return;
                
                this.componentId = componentId;
                this.checkboxes = this.component.querySelectorAll('input[type="checkbox"]');
                this.statusContainer = this.component.querySelector('.status-container');
                
                this.init();
            }

            init() {
                // 更新状态显示
                this.updateStatus();
                
                // 为每个复选框添加事件监听
                this.checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        this.updateStatus();
                        this.logChange(checkbox);
                    });
                });
            }

            // 更新状态显示
            updateStatus() {
                if (!this.statusContainer) return;
                
                this.statusContainer.innerHTML = '';
                this.checkboxes.forEach((checkbox, index) => {
                    const statusItem = document.createElement('div');
                    statusItem.className = `status-item ${checkbox.checked ? 'checked' : 'unchecked'}`;
                    
                    const label = this.getLabelText(checkbox);
                    statusItem.innerHTML = `
                        
                        ${label}: ${checkbox.checked ? '✅ 已选中' : '❌ 未选中'}
                    `;
                    
                    this.statusContainer.appendChild(statusItem);
                });
            }

            // 获取标签文本
            getLabelText(checkbox) {
                const parent = checkbox.closest('.checkbox-wrapper, .switch-wrapper, .heart-checkbox');
                if (parent) {
                    const labelElement = parent.querySelector('.checkbox-label');
                    if (labelElement) return labelElement.textContent;
                }
                return `选项 ${Array.from(this.checkboxes).indexOf(checkbox) + 1}`;
            }

            // 记录变化
            logChange(checkbox) {
                const label = this.getLabelText(checkbox);
                console.log(`[组件 ${this.componentId}] ${checkbox.checked ? '✓' : '✗'} ${label}`);
            }

            // 全选
            selectAll() {
                this.checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
                this.updateStatus();
                this.showNotification('已全选所有选项');
            }

            // 取消全选
            deselectAll() {
                this.checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                this.updateStatus();
                this.showNotification('已取消所有选择');
            }

            // 反选
            invertSelection() {
                this.checkboxes.forEach(checkbox => {
                    checkbox.checked = !checkbox.checked;
                });
                this.updateStatus();
                this.showNotification('已反选所有选项');
            }

            // 显示通知
            showNotification(message) {
                const notification = document.createElement('div');
                notification.className = 'checkbox-notification';
                notification.textContent = `[${this.componentId}] ${message}`;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }
        }

        // 初始化所有组件
        const component1 = new CheckboxComponentManager('checkboxComponent1');
        const component2 = new CheckboxComponentManager('checkboxComponent2');

        // 全局函数供按钮调用
        function selectAll(componentId) {
            const manager = componentId === 'checkboxComponent1' ? component1 : component2;
            if (manager) manager.selectAll();
        }

        function deselectAll(componentId) {
            const manager = componentId === 'checkboxComponent1' ? component1 : component2;
            if (manager) manager.deselectAll();
        }

        function invertSelection(componentId) {
            const manager = componentId === 'checkboxComponent1' ? component1 : component2;
            if (manager) manager.invertSelection();
        }

        // 为组件2添加独立的事件监听
        if (component2) {
            component2.checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    component2.updateStatus();
                    component2.logChange(checkbox);
                });
            });
            component2.updateStatus();
        }