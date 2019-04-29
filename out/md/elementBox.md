## $.fn.elementBox
超出隐藏元素盒子

### 需求/用途

### 使用示例

<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/elementBox.html" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

``` html
<div class="overflow-box">
    <div class="overflow-item"></div>
    <div class="overflow-tag"></div>
</div>
```
``` js
$(document).elementBox({
    // 默认值
    // container: '.overflow-box',
    // item: '.overflow-item',
    // tag: '.overflow-tag',
    // text: '...',
    // containerStyle: {},
    // itemStyle: {},
    // tagStyle: {},
    width: 300,
    height: 22
});

```
