## form-control
表单元素ui

### 需求/用途
问题:   
在原 ui 库中, 表单元素被激活时的效果 (底部红线从中间展开), 和表单验证时效果, 都是绑定在 .form-control 元素上的.  
当我们对表单元素进行扩展时, 由于表单元素内部不能再嵌入其它标签, 所以不得不提高 .form-control 的层级, 但这样一来, 表单验证的效果就会失效(.form-control不在表单元素上, 不能取到值), 因此, 需要将两种效果分离开.  
需求  
1. 在改动了 原ui库 的dom结构时, 继续使用被激活时的效果 和 表单验证效果
2. 左边lable宽度自适应

### 使用示例

<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/form-control.html" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>
