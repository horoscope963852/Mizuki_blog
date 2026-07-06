---
title: "Argon 短代码 测试"
published: 2025-11-04
description: "测试Argon主题支持的各种短代码功能，包括提示框、标签、进度条等"
tags: ["Argon主题", "短代码", "测试"]
category: "技术"
draft: true
---

[alert]foobar[/alert]

[alert icon="flag"]foobar[/alert]

[checkbox]默认复选框[/checkbox]
[checkbox checked="true"]已经完成的项目[/checkbox]
[checkbox checked="false"]还未完成的项目[/checkbox]

方形
[label]默认标签[/label]
[label color="indigo"]靛蓝标签[/label]
[label color="green"]绿色标签[/label]
[label color="red"]红色标签[/label]
[label color="blue"]蓝色标签[/label]
[label color="orange"]橙色标签[/label]
圆形
[label color="indigo" shape="round"]靛蓝标签[/label]
[label color="green" shape="round"]绿色标签[/label]
[label color="red" shape="round"]红色标签[/label]
[label color="blue" shape="round"]蓝色标签[/label]
[label color="orange" shape="round"]橙色标签[/label]

[progressbar progress="20"]默认进度条[/progressbar]
[progressbar progress="30" color="indigo"]靛蓝进度条[/progressbar]
[progressbar progress="40" color="green"]绿色进度条[/progressbar]
[progressbar progress="66" color="red"]红色进度条[/progressbar]
[progressbar progress="80" color="blue"]蓝色进度条[/progressbar]
[progressbar progress="100" color="orange"]橙色进度条[/progressbar] 
[progressbar progress="23"][/progressbar]
[progressbar]没有指明参数的进度条[/progressbar]
[progressbar progress="66.66"]小数进度条[/progressbar]

[alert]默认提示[/alert]
[alert color="indigo"]靛蓝提示[/alert]
[alert color="green"]绿色提示[/alert]
[alert color="red"]红色提示[/alert]
[alert color="blue"]蓝色提示[/alert]
[alert color="orange"]橙色提示[/alert]
[alert color="black"]黑色提示[/alert]
[alert title="我是标题" color="indigo"]带标题的提示[/alert]
[alert icon="flag" color="indigo"]带图标的提示[/alert]
[alert title="我是标题" icon="flag" color="indigo"]带标题和图标的提示[/alert]

[admonition]默认警告[/admonition]
[admonition title="我是标题" color="indigo"]靛蓝警告[/admonition]
[admonition title="我是标题" color="green"]绿色警告[/admonition]
[admonition title="我是标题" color="red"]红色警告[/admonition]
[admonition title="我是标题" color="blue"]蓝色警告[/admonition]
[admonition title="我是标题" color="orange"]橙色警告[/admonition]
[admonition title="我是标题" color="black"]黑色警告[/admonition]
[admonition title="我是标题" color="grey"]灰色警告[/admonition]
[admonition title="我是标题" icon="flag" color="indigo"]带标题和图标的警告[/admonition]
[admonition color="indigo"]不带标题的警告[/admonition]
[admonition title="只有标题的警告" color="indigo"][/admonition]
[admonition title="只有标题和图标的警告" icon="flag" color="indigo"][/admonition]

[collapse title="默认折叠区块"]折叠的内容[/collapse]
[collapse title="靛蓝折叠区块" color="indigo"]折叠的内容[/collapse]
[collapse title="绿色折叠区块" color="green"]折叠的内容[/collapse]
[collapse title="红色折叠区块" color="red"]折叠的内容[/collapse]
[collapse title="蓝色折叠区块" color="blue"]折叠的内容[/collapse]
[collapse title="橙色折叠区块" color="orange"]折叠的内容[/collapse]
[collapse title="黑色折叠区块" color="black"]折叠的内容[/collapse]
[collapse title="灰色折叠区块" color="grey"]折叠的内容[/collapse]
[collapse title="无色折叠区块" color="none"]折叠的内容[/collapse]
[collapse title="显示左边框的折叠区块" showleftborder="true"]折叠的内容[/collapse]
[collapse title="带图标的折叠区块" icon="flag"]折叠的内容[/collapse]
[collapse title="默认展开的折叠区块" collapsed="false"]折叠的内容[/collapse]

[friendlinks/]

[timeline]
2000-1-1|这是标题|这是内容
2010-1-1|这是标题|我是内容|我是第二行内容
2019-12-31/23:59|左边的时间是换行的|在时间中，用 / 号表示一个换行符
[/timeline]

[hidden]一段隐藏的文本[/hidden]
[hidden type="background"]黑条隐藏文本[/hidden]
[hidden type="blur"]模糊隐藏文本[/hidden]
[hidden tip="你知道的太多了"]鼠标停留会有提示[/hidden]

 ::github{repo="solstice23/argon-theme"}

[ GitHub](https://github.com/)[solstice23/argon-theme](https://github.com/solstice23/argon-theme)  

[video url="https://xxxxx.com/xxxxx.mp4"][/video]
[video url="https://xxxxx.com/xxxxx.mp4" height="240" width="320"][/video]
[video url="https://xxxxx.com/xxxxx.mp4" autoplay="true"][/video]

[post_time][/post_time]
[post_modified_time][/post_modified_time]
[post_time format="Y/n/j ag:i:s"][/post_time]

[ref]注释内容[/ref]