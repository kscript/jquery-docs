## $.toast
提示信息

### 需求/用途

### 使用示例

<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<iframe src="html/toast.html#toast" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

``` js
    $.http({
        url: '/test.json'
    },
    function (data) {
        $.toast({
            list: data.toast
        });
    });
```

### 参数说明

 - options参数 属性

|属性|类型|默认值|说明|
|--|--|--|--|
| interval | number | 3000 | 间隔时间(超出自动关闭当前提示) |
| key | string | "toast" | 提示信息在localStorage的key |
| list | array | [] | 要显示的信息的列表 (该属性有传入值时, 不会再去 localStorage 里获取) |
| start | function | - | 开始显示提示信息 |
| verify | function | - | 验证是否满足触发条件 |
| getText | function | - | 取出要显示的信息, 参数: [item: 当前toast], 返回一个用于显示的字符串 |
| show | function | - | 提示信息的显示方式, 参数: [text: getText返回的字符串, done: 显示完的回调, item: 当前toast ] |
| close | function | - | 当前提示信息已关闭时, 参数: [index: 当前toast的索引] |
| complete | function | - | 提示信息已全部显示完时 |
| queue | function | - | 用于处理提示消息队列, 递归list并逐条显示 |


