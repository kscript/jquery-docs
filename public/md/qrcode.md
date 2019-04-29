## $.fn.qrcode
二维码

### 需求/用途
收集各项信息, 并将其合并成一个用于生成二维码的字符串

### 使用示例

<div class="iframe-box" style="padding-bottom: 260px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/qrcode.html?id=111#test" style="border: 0;width: 100%;min-width: 600px;min-height: 260px; position: absolute;"></iframe>
</div>

``` html
<div class="qrcode"></div>

<script src="qrcode.min.js"></script>
<script src="params.js"></script>
<script src="sweetalert2.js"></script>
<script src="http.js"></script>
<script src="qrcode.js"></script>
```

``` js

    var token = 'f65fc8448wnvSU1yHijqU13STm7eglnXD1V5n11O'
    var count = 50;
    $(".qrcode").qrcode({
        qrcode: {
            correctLevel: QRCode.CorrectLevel.L
        },
        http: {
            url: '../test.json',
            type: 'get',
            data: function(){
                return {
                    key: this.key
                };
            }
        },
        settings: {
            expire: 2 * 60 * 1000
        },
        params: {
            url: [
                'id',
                {
                    hash: function () {
                        return location.hash
                    }
                }
            ],
            form: 'name'
        },
        merge: function(data) {
            return {
                token: token,
                data: data
            }
        },
        error: function(){
            // console.log(this, arguments);
            // 继续尝试
            this.timer();
        },
        verify: function(data) {
            if (data.status - 1 === 0) {
                return true;
            }
            return count-- <= 0;
        },
        done: function(){
            console.log('扫码成功', this);
        }
    });
```

### 参数说明
- 参数options 属性

| 属性 | 类型 | 说明 |
| -- | -- | -- |
| qrcode | object | 二维码生成时的配置. 需要的属性信息, 可以参考 [qrcodejs](https://github.com/davidshimjs/qrcodejs) 的文档 |
| settings | object | $.fn.qrcode自己的一些配置 |
| params | object | 调用 myParams方法 时. 需要的属性信息, 可以参考 [myParams方法](#/viewer#params) 第一个参数 options 的属性列表 |
| http | object | \$.http方法的参数, 查询扫码状态时, 会使用 [$.http方法](#/viewer#http) |
| merge | function | 在 myParams方法收集的数据 需要与 其它数据 合并时使用 |
| verify | function | \$.http方法成功时调用, 用于验证是否扫码成功 |
| error | function | \$.http方法失败时调用, 用于决定是否继续验证 |
| done | function | 扫码成功后的回调 |

- settings 属性的配置
| 配置项 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| expire | number | 0 | 二维码过期时间 (过期后会重新生成二维码) |
| interval | number | 1000 | 请求频率 (每次请求成功后的休息时间) |

### 
