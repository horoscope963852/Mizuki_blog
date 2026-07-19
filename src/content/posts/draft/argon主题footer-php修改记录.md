---
title: "Argon主题footer.php修改记录"
published: 2025-10-30
description: "通过修改Argon主题的footer.php文件，添加显示查询次数和内存占用功能，并删除版权声明的方法记录"
tags: ["WordPress", "Argon主题", "PHP", "网站美化"]
category: "前端技术"
draft: true
---

## 修改过程

通过修改主题源码中的footer.php文件，添加显示查询次数和内存占用功能，并删除版权声明（请勿模仿）

如果修改，你会在仪表盘收到“警告：你可能修改了 Argon 主题页脚的版权声明，Argon 主题要求你至少保留主题的 Github 链接或主题的发布文章链接。”这样的信息。

## 代码内容

修改后的文件内容如下：

```php
<footer id="footer" class="site-footer card shadow-sm border-0">
    <?php
        echo get_option('argon_footer_html');
    ?>
    <div class="white footer-beian">
      <a class="jgawb" href="https://beian.mps.gov.cn/#/query/webSearch?code=51012402001540" target="_blank">
        <?php echo '川公网安备51012402001540号'; ?>
      </a>
      <a class="jicpb" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        <?php echo '蜀ICP备2025167295号-1'; ?>
      </a>
    </div>
    <!--耗时及占用内存开始-->
    <?php printf(' | 耗时 %.3f 秒 | 查询 %d 次 | 内存 %.2f MB |',
                 timer_stop(0, 3),
                 get_num_queries(),
                 memory_get_peak_usage() / 1024 / 1024); ?><br>
    <!--耗时及占用内存结束-->
    <div>Theme <a href="https://github.com/solstice23/argon-theme" target="_blank"><strong>Argon</strong></a><?php if (get_option('argon_hide_footer_author') != 'true') {echo " By solstice23"; }?></div>
</footer>
</main>
</div>
</div>
<script src="<?php echo $GLOBALS['assets_path']; ?>/argontheme.js?v<?php echo $GLOBALS['theme_version']; ?>"></script>
<?php if (get_option('argon_math_render') == 'mathjax3') { /*Mathjax V3*/?>
    <script>
        window.MathJax = {
            tex: {
                inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]],
                displayMath: [['$$','$$']],
                processEscapes: true,
                packages: {'[+]': ['noerrors']}
            },
            options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
                ignoreHtmlClass: 'tex2jax_ignore',
                processHtmlClass: 'tex2jax_process'
            },
            loader: {
                load: ['[tex]/noerrors']
            }
        };
    </script>
    <script src="<?php echo get_option('argon_mathjax_cdn_url') == '' ? '//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js' : get_option('argon_mathjax_cdn_url'); ?>" id="MathJax-script" async></script>
<?php }?>
<?php if (get_option('argon_math_render') == 'mathjax2') { /*Mathjax V2*/?>
    <script type="text/x-mathjax-config" id="mathjax_v2_script">
        MathJax.Hub.Config({
            messageStyle: "none",
            tex2jax: {
                inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]],
                displayMath: [['$$','$$']],
                processEscapes: true,
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
            },
            menuSettings: {
                zoom: "Hover",
                zscale: "200%"
            },
            "HTML-CSS": {
                showMathMenu: "false"
            }
        });
    </script>
    <script src="<?php echo get_option('argon_mathjax_v2_cdn_url') == '' ? '//cdn.jsdelivr.net/npm/mathjax@2.7.5/MathJax.js?config=TeX-AMS_HTML' : get_option('argon_mathjax_v2_cdn_url'); ?>"></script>
<?php }?>
<?php if (get_option('argon_math_render') == 'katex') { /*Katex*/?>
    <link rel="stylesheet" href="<?php echo get_option('argon_katex_cdn_url') == '' ? '//cdn.jsdelivr.net/npm/katex@0.11.1/dist/' : get_option('argon_katex_cdn_url'); ?>katex.min.css">
    <script src="<?php echo get_option('argon_katex_cdn_url') == '' ? '//cdn.jsdelivr.net/npm/katex@0.11.1/dist/' : get_option('argon_katex_cdn_url'); ?>katex.min.js"></script>
    <script src="<?php echo get_option('argon_katex_cdn_url') == '' ? '//cdn.jsdelivr.net/npm/katex@0.11.1/dist/' : get_option('argon_katex_cdn_url'); ?>contrib/auto-render.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body,{
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false}
                ]
            });
        });
    </script>
<?php }?>

<?php if (get_option('argon_enable_code_highlight') == 'true') { /*Highlight.js*/?>
    <link rel="stylesheet" href="<?php echo $GLOBALS['assets_path']; ?>/assets/vendor/highlight/styles/<?php echo get_option('argon_code_theme') == '' ? 'vs2015' : get_option('argon_code_theme'); ?>.css">
<?php }?>

</div>
</div>
<?php
wp_enqueue_script("argonjs", $GLOBALS['assets_path'] . "/assets/js/argon.min.js", null, $GLOBALS['theme_version'], true);
?>
<?php wp_footer(); ?>
</body>

<?php echo get_option('argon_custom_html_foot'); ?>

</html>
```

下面的压缩包中包含Argon主题原始文件，作为本站备份。

[footer_backup](/image_1.zip)[下载](/image_1.zip)
