## myParams
参数收集

### 需求/用途
在生成二维码时需要用到一些参数, 为了模块化的管理这些参数, 实现了一个收集参数的函数.   
同时, 在这个函数又进行了增加了一些控制, 使它成为一个通用的功能, 用于参数信息的收集.

### 使用示例

<div class="iframe-box no-border" style="padding-bottom: 360px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/params.html?id=url-- 111#test" style="border: 0;width: 100%;min-width: 600px;min-height: 360px; position: absolute;"></iframe>
</div>

``` js
    var token = 'var-- f65fc8448wnvSU1yHijqU13STm7eglnXD1V5n11O'
    myParams({
        var: [
            'token',
            {
                'value1': 'var-- 数组元素是对象时, 遍历这个对象的属性',
                'value2': function(){
                    return 'var-- 对象属性是函数时,这个属性和其返回值可以合并为一个属性(只有var, url,form支持这种方式)';
                },
            }
        ],
        url: [
            'id'
        ],
        form: 'name',
        text: ".text",
        data: '.console',
        // param 只支持 object/object[] 的写法, 
        param: [
            {
                name: '合并方式1',
                value: 'param-- name和value属性同时存在时, 将它们组合为一个属性',
                other: "param-- 合并方式1只有 name+value 会被组合后合并"
            },
            {
                "合并方式2": "param-- name和value属性没有同时存在时, 遍历这个对象里所有的属性",
                other: "param-- 合并方式2的属性都会被合并"
            }
        ]
    }, 
    {
        // 允许多个事件
        muilt: true,
        // 给表单元素添加事件支持
        addEvent: true
    },
    function(data){
        $(".console pre").html(JSON.stringify(data.json, null, 2));
        console.log(data);
    });
```

### 参数说明

|属性|类型|说明|
|--|--|--|
| options | object | 需要收集的参数 |
| settings | object | 用于控制的配置, 可省参数 |
| func | function | 当监听了表单元素, 表单元素触发 指定事件时的回调 |

- options 属性

|属性|类型|说明|
|--|--|--|
| url | string/string\[]/object[] | 从url上取参数
| form | string/string\[]/object[] | 从表单元素上取参数
| cookie | string/string\[]/object[] | 从cookie上取参数
| var | string/string\[]/object[] | 从window上取变量
| text | string/string\[]/object[] | 从dom元素文本上取参数
| param | object/object[] | 已经处理过的信息, 用于跟其它参数合并<br>格式: \[{name:value}]/[{name: name, value: value}], <br> 前者会收集对象里的所有信息作为参数, 后者将name与value组合成一个参数

- settings 属性

|属性|类型|默认值|说明|
|--|--|--|--|
| muilt | boolean | true | 允许多个监听 |
| addEvent | boolean | true | 给表单元素添加事件监听 |
