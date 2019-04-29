## $.fn.formSubmit
表单提交

### 需求/用途
为了防止表单的重复提交, 简化/统一表单的提交流程, 用尽量少的配置, 完成表单的提交.   
和多项选择器不同的是, 表单提交依赖dom结构(form + button/input)

### 使用示例

``` html
<div class="container">
    <form action="/info" method="POST">
        <button class="submit"></button>
    </form>
</div>
```
// 给表单绑定formSubmit
``` js
    $(".container").formSubmit(ajaxOption, settings, success, error);
    // 如果在form表单上配置了 action, 那么可以这样写
    $(".container").formSubmit({}, success, error);
```
<font color="green">
formSubmit 需要一个表单, 并且最好提供 action, method (表单配置权重 > options配置权重, 这样做可以在选择器为多个表单时, 保持提交信息的准确性)
</font>
<font color="green">
formSubmit 默认使用 .submit 作为提交按钮的选择器, 建议用 button/input[type='submit'] 标签, 因为这样可以在用户按enter键时触发提交
</font>

### 参数说明
- formSubmit方法 参数

|属性|类型|说明|
|--|--|--|
| ajaxOption | object | 除了 data/beforeSend/success/error 有重新封装, 其它的可以参考ajax的配置 |
| settings | object | formSubmit 自己的一些配置, 可省参数, 如果第二个参数的类型是function, 那么settings就会被忽略掉 |
| success | function | 提交成功回调, 不需要配置settings的话, success 可以作为第二个参数 |
| error | function | 提交出错回调 |

- ajaxOption 属性 

只列举需要说明的配置
|属性|类型|默认值|说明|
|--|--|--|--|
| url | string | - | 相当于在form标签上配置action, 二选一即可. 重复配置时, 以form标签上的为准 |
| type | string | POST | 相当于在form标签上配置method, 二选一即可. 重复配置时, 以form标签上的为准 |
| beforeSend | function | 尝试返回form.valid() | 若覆盖默认值, 则需要自行处理表单验证等相关逻辑 |
| data | function | form.serializeArray() | 若覆盖默认值, 则data必须为函数, 因为需要在提交表单时获取实时数据 |

<font color="green"> 这里的 url/type 写为 action/method 也是可以的, 请求数据的$.http方法对其做了兼容</font>
- settings 属性

settings本身就是可省的，所以一般不需要对其进行配置
|属性|类型|默认值|说明|
|--|--|--|--|
| form | string | '.form' | 表单 |
| submit | string | '.submit' | 提交按钮 |
| disabledClass | string | 'disabled' | 不可提交时的类, 注意类名前不加(.) |
| validate | boolean | true | 用户没有配置beforeSend时, 尝试在提交表单前对表单进行验证 |
| isBubble | boolean | true | 从触发提交表单的按钮冒泡到表单, 从按钮开始向外找表单, 那么可以保证表单的唯一性 |
| preventDefault | boolean | true | 提交表单时, 取消事件默认行为 |
