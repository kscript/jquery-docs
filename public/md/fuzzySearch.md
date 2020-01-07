## $.fn.fuzzySearch
模糊搜索

### 参数说明

|属性|类型|说明|
|--|--|--|
| event | object | 触发事件 |
| event.trigger | string | 触发事件类型 |
| event.handler | (event, () => void) | 变异处理函数, 第二个参数表示是否要进行模糊匹配 |
| event | object | 触发事件 |
| reInit | boolean | 是否要重新初始化 |
| expire | number | 缓存数据的到期时间, 毫秒, 为0时不开启缓存 |
| getData | done => void done(data) | 请求数据 |
| matchData | (inputValue, data) => string | 匹配数据 |
| showData | (matchResult) => void | 显示数据 |

- 如果开启缓存, 且匹配到数据, 那么跳过getData, matchData, 直接执行showData(matchResult)
- data相关函数的this为当前的fuzzySearch实例
- getData如果没有给回调函数 done 传递参数, 结束本次流程

<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/fuzzySearch.html" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>
