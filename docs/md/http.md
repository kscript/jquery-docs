## $.http
请求数据

### 需求/用途
为什么要对 $.ajax 二次封装?
1. 虽然 $.ajax 功能已经比较完备了, 但在项目中还需要一些扩展, 比如统一的错误拦截并提示, 错误时重发请求..
2. 直接在 $.ajax 上做扩展, 犹如滚雪球, 不利于项目迭代

$.http 方法通过对 $.ajax 的请求结果进行处理, 实现: 错误拦截, 请求错误时重发请求

### 使用示例
``` js
    $.http({
            url: '../test.json'
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
<div class="iframe-box no-border" style="padding-bottom: 360px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/http.html" style="border: 0;width: 100%;min-width: 600px;min-height: 360px; position: absolute;"></iframe>
</div>

### 参数说明

|属性|类型|说明|
|--|--|--|
| options | object | ajax原有的请求配置 |
| settings | object | 扩展功能设置, 可省参数 |
| success | function | 请求成功回调, 不需要配置settings的话, success 可以作为第二个参数 |
| error | function | 请求出错回调 |

当参数中有 success, error 时, 覆盖 options 中的 同名属性

- options 默认值

|属性|类型|说明|
|--|--|--|
| type | "get" | |
| dataType | "json" | |
| processData | false | data 为 FormData 时添加的默认值 |
| contentType | false | data 为 FormData 时添加的默认值 |

- settings 默认值

|属性|类型|说明|
|--|--|--|
| showError | "true" | 请求出错时提示错误信息 |
| retry | 3 | 请求失败时的重试次数 |
| toast | 'toast' | 提示信息key, 如果返回数据中存在该属性则提示, 为空时不提示 |

<font color="green">如果不想要默认的toast效果, 可以设置options.dataFilter</font>

### 变异方法
dataFilter:   
将第一个参数由 jsonString 改为 json   
如果返回值data为string, 返回 data  
如果返回值data为object, 返回 JSON.stringify(data)  
如果返回值data为其它, 返回 原有的jsonString  
