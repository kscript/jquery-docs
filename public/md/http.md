## $.http
请求数据

### 设计构想
为什么要对 $.ajax 二次封装?
1. 虽然 $.ajax 功能已经比较完备了, 但在项目中还需要一些扩展, 比如统一的错误拦截并提示, 错误时重发请求..
2. 直接在 $.ajax 上做扩展, 犹如滚雪球, 不利于项目迭代

$.http 方法通过对 $.ajax 的请求结果进行处理, 实现: 错误拦截, 请求错误时重发请求

### 使用示例
``` js
    $.http({
            url: ''
        }, 
        // // settings 可以省略
        // {
        //     retry: 1,
        //     showError: true
        // }, 
        function(data){
            console.log(data);
        }, 
        function(error){
            console.log(error);
        }
    );
```

### 参数说明
|属性|类型|说明|
|--|--|--|
| option | object | ajax原有的请求配置 |
| settings | object | 扩展功能设置, 可省参数 |
| settings.retry | number | 请求失败时的重试次数 |
| settings.showError | boolean | 请求出错时提示错误信息 |
| success | function | 请求成功回调, 不需要配置settings的话, success 可以作为第二个参数 |
| error | function | 请求出错回调 |

当参数中有 success, error 时, 覆盖 option 中的 同名属性

- option 默认值
|属性|类型|说明|
|--|--|--|
| type | "get" ||
| dataType | "json" ||
| processData | false | data 为 FormData 时 |
| contentType | false | data 为 FormData 时 |

- settings 默认值
|属性|类型|说明|
|--|--|--|
| showError | "true" | 显示错误提示 |
| retry | 3 | 重试次数 |


