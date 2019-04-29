## $.toast
提示信息

### 需求/用途

### 使用示例


- 示例1
<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/toast1.html#toast" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

``` js
    // 发起http请求时, 会检查是否有需要toast信息
    // 默认检查的是: 返回数据中有没有toast信息的key存在 (在$.http的settings中配置这个key, 默认'toast')
    // 如果有, 那么会调用 $.toast({list: response['toast']})
    $.http(
    // ajax option
    {
        url: '../test.json'
    },
    // settings
    {
        toast: 'toast'
    },
    function(response) {
    });
```

<br>  

- 示例2

<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/toast2.html#toast" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

``` js
    $.http({
        url: '../test.json',
        // dataFilter 是变异方法, 具体说明, 参见 [请求数据] 的说明文档
        // 有 dataFilter 时, 不会触发默认的toast效果
        // 这样设计是考虑到: 当我们想要的, 不是默认的toast效果时, 只需要定义下dataFilter, 就可以自由的配置toast效果了
        dataFilter: function(data) {
            // 对toast进行一些配置
            $.toast({
                interval: 5000,
                getText: function(item){
                    return item.c + ':' + item.a;
                },
                list: data.toast
            });

            // 触发默认效果
            // $.toast({
            //     list: data.toast
            // });
            return data;
        }
    }, function(data){});
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
| close | function | - | 当前提示信息已关闭时, 参数: [index: 当前toast的索引 (一般为0)] |
| complete | function | - | 提示信息已全部显示完时 |
| queue | function | - | 用于处理提示消息队列, 递归list并逐条显示 |
