## batchTask
批量任务

### 需求/用途

### 使用示例
<div class="iframe-box" style="padding-bottom: 400px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/batch.html" style="border: 0;width: 100%;min-width: 600px;min-height: 400px; position: absolute;"></iframe>
</div>

### 参数说明

|属性|类型|默认值|说明|
|--|--|--|--|
| queue | data[] | [] | 要执行的任务队列, data是该任务要用到的数据信息, 比如ajax请求的参数 |
| max | number | 5 | 同时执行任务数, 不大于0时, 使用默认值 |
| timeout | number | 0 | 超时时间(毫秒), 大于0时有效 |
| stateChange | (state, data, index, err, res) => void | function(){} | 状态改变时的回调 |
| task | (data, success, error) => void | function(){} | 要执行的任务, success和error回调应当至少有一个被调用(第一个有效) |
| done | (states: state[]) => void | function(){} | 所有任务执行完毕后的回调 |

stateChange 函数的参数
 - state: 当前任务的执行状态
 - data: 当前任务的一些数据信息
 - index: 当前任务在队列里的索引
 - err: 执行出错时的报错信息
 - res: 执行结果