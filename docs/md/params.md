## myParams
参数收集

### 设计构想
之前在生成二维码时需要用到一些参数, 为了模块化的管理这些参数, 实现了一个收集参数的函数.   
同时, 在这个函数又进行了增加了一些控制, 使它成为一个通用的功能, 用于参数信息的收集.

### 使用示例

<div style="padding-bottom: 210px;position: relative; z-index: 99999;">
<iframe src="html/params.html?form=iframe#test" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

``` js
var token = '123';
myParams({
    url: [
        {
            hash: function(){
                return location.hash
            }
        }
    ],
    form: 'name',
    var: 'token'
}, function(data){
    $(".console .text").html(JSON.stringify(data.json, null, 2))
    console.log(data);
});
```

### 参数说明

|属性|类型|说明|
|--|--|--|
| option | object | 需要收集的参数 |
| settings | object | 用于控制的配置, 可省参数 |
| func | function | 当监听了表单元素, 表单元素触发 指定事件时的回调 |

- option 属性

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
