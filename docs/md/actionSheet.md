## $.fn.actionSheet
动作面板

### 参数说明

|属性|类型|默认值|说明|
|--|--|--|--|
| title | string | '' | 标题, 为空时不显示 |
| mode | stirng | 'text' | 使用text/html方法写入内容 |
| defer | number | 300 | 关闭后延迟移除dom |
| items | {text: string}[] | [] | 可选项 |
| outsideClose | boolean | true | 点击外部mask遮罩是否关闭 |
| showCancelButton | boolean | true | 显示取消按钮 |
| cancelButtonText | string | '取消' | 取消按钮文本 |
| create | (html: HTMLElement) => {} | function(){} | 创建时回调, html: HTMLElement |
| close | (type: string) => {} | function(){} | 关闭时回调, type表示通过哪里触发, confirm(点击可选项)/cancel(点击取消按钮)/close(点击遮罩) |
| confirm | function | function(){} | 点击可选项后的回调 |
| cancel | function | function(){} | 点击取消按钮后的回调 |

 ### 使用示例
<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/actionSheet.html" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>
