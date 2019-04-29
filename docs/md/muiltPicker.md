## $.fn.muiltPicker
一个用于选择列表项的组件, 支持: 单选 / 多选 / 范围选择 / 自定义 

### 需求/用途
写muilt-picker之初是按照一个范围选择器来写的, 由于后面又有其它组件要写, 这些组件的表现形式和功能看起来并不一样, 但内部的机制是基本一致的, 所以在抽离了具体业务逻辑后, 形成了这么一个类似高阶组件的东西. 
muilt-picker组件基本不涉及ui(但提供容器宽/选择列表高的配置)和业务逻辑, 只提供一套 组件的实现机制, 使用时可以通过不同方法,钩子,以及扩展来构成具体的业务组件, 参考如下:
<iframe src="./images/muilt-picker.svg" width="700" height="600" style="border: 0;"></iframe>

### 使用说明

1. 初始化 picker
同一个selector如果多次调用, 则第一次时为初始化, 其它为修改options  
``` js
$(selector).muiltPicker(options);
```

2. 获取 picker 
``` js
// 通过 muiltPicker 方法
$(".muilt-picker").muiltPicker();
// 通过 data 方法
$(".muilt-picker").data("muiltPicker");
```

 - <font color="green"> 不管是 初始化/修改/获取 操作, 均返回同一个 picker 对象 </font>
 - <font color="green"> selector为多个元素时, 每个元素都会初始化一个 picker 对象, 并只返回第一个元素的 picker 对象 </font>

### 配置说明
- 属性

|属性|类型|默认值|说明|
|--|--|--|--|--|
| mode | string | "range" | - |
| inner | boolean | true | 从选择器内部选择 |
| autoShow | boolean | true | 激活组件时自动显示 |
| resetSelected | boolean | true | 每次隐藏时是否重置选择 |
| inline | boolean | false | 是否嵌入页面内 |
| async | boolean | false | 使用异步方法生成列表 |
| autoClose | boolean | false | 点击组件外自动关闭 |
| triggerClose | boolean | false | 组件显示时, 点击触发选择器元素是否关闭 |
| leaveClose | boolean | false | 鼠标移出组件容器时关闭 |
| container | selector \[$()第一个参数] | ".picker-container" | 显示容器(应存在于组件内部, 忽略inner) |
| selectSelecotr | selector \[$()第一个参数] | ".select-group" | 选择列表元素的选择器(应存在于组件内部, 忽略inner) |
| optionSelecotr | selector \[$()第一个参数] | ".li-item" | 选项元素的选择器(应存在于组件内部, 忽略inner) |
| triggerSelecotr | selector \[$()第一个参数] | ".picker-input-group" | 用于激活组件的选择器 |
| scrollSelecotr | selector \[$()第一个参数] | ".scroll-bar" | 滚动条元素 |
| containerWidth | string/number | "100%" | 容器宽 |
| scrollBarHeight | string/number | "240px" | 选择列表高 |
| custom | function | - | 有自定义函数时, 只保留生命周期/插件配置, 将控制权交给自定义函数 |
| customElms | function | - | 向选择器添加自定义元素 |
| generator | function(done) | - | 用于生成选择列表的函数 不为函数时, 默认使用html中的结构, 当async为true时, 需使用回调函数done, 来传递生成的内容 |
| plugins | object | - | 扩展(实验功能, 慎用) |

- 函数钩子

|钩子|说明|
|--|--|
| beforeInit | 在初始化前调用, 此时picker为空对象 |
| beforeRunPlugins | 在执行扩展功能(如果有配置plugins的话)前调用, 此时picker为空对象 |
| afterRunPlugins | 在执行扩展功能后调用, 此时picker的值的合并顺序为: 插件默认值 -> 从dom元素上获取到的data -> 用户传递的options -> 用户传递的options.plugins函数返回值 |
| afterInit | 在初始化后调用 |
| beforechange(current, selected, active) | 在用户选择了一个选项后, change逻辑执行前 |
| afterchange(current, selected, active) | 在用户选择了一个选项后, change逻辑执行后 |
| beforeShow | 在用户调用picker.show函数后, 插件显示前调用 |
| afterShow | 在用户调用picker.show函数后, 插件显示后调用 |
| beforeHide | 在用户调用picker.hide函数后, 插件隐藏前调用 |
| afterHide | 在用户调用picker.hide函数后, 插件隐藏后调用 |
| outsideClick | 点击外部时触发, 返回一个是否可以关闭的boolean. 参数: [selected: 用户选择过的项] |
| clear | 在用户调用picker.clear时 |
| destroy | 在用户调用picker.destroy后 |

<font  color="green">如果存在 beforechange 函数钩子, 且调用 beforechange 后返回false, 那么change将会被阻止, 不会触发afterChange</font>

### picker对象属性
|属性|类型|说明|
|--|--|--|
| elms | object | 组件可能会用到的元素 |
| source | object | 组件所绑定的元素 |
| options | object | 组件最终的options |
| events | object | 通过 setEvents 注册的事件 |
| plugins | - | - |
| setOptions | function | 设置options |
| show | function | 显示多项选择器 |
| hide | function | 隐藏多项选择器 |
| setHtml | function(done) | 设置组件结构 |
| setStyles | function | 设置组件样式 |
| addEvents | function | 添加事件监听 |
| offEvent | function | 取消事件监听 |
| setEvents | function | 设置默认的事件监听 |
| select | function | 选择列表项(给组件设置默认值) |
| clear | function | 清除 |
| destroy | function | 销毁 |

<font  color="green">
暴露出来的 setHtml/setStyles/setEvents 方法主要是为了在自定义时用的. (因为配置了 options.custom 函数的话, 将不会自动调用这些方法) <br>
如果要改dom结构或者样式, 直接改即可, 不必使用这些方法~
</font>

### 使用示例

- 范围选择器
<div class="iframe-box no-border" style="padding-bottom: 360px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/muilt-picker1.html" style="border: 0;width: 100%;min-width: 600px;min-height: 360px; position: absolute;"></iframe>
</div>

范围选择器 dom 结构

``` html
<div class="salary-picker muilt-picker">
    <div class="picker-input-group">
        <input class="picker-start" type="text" name="" readonly>
        <span class="split-label"></span>
        <input class="picker-end" type="text" name="" readonly>
    </div>
    <div class="picker-container">
        <ul class="select-group scroll-bar">
            <li class="li-item" data-value="1000">1000</li>
        </ul>
    </div>
</div>
```
范围选择器 js

``` js
$(".salary-picker").muiltPicker({
    mede: 'range',
    // 鼠标移出组件容器时关闭?
    leaveClose: false,
    // 点击组件外时自动关闭?
    autoClose: false,
    // 隐藏组件时重置已选项? 
    resetSelected: true,
    // 自定义一些即将会用到的元素, 将它们合并到 this.elms
    customElms: function(source, context){
        return {
            start: $(".picker-start", source),
            end: $(".picker-end", source)
        }
    },
    // 在组件外点击时, 会调用outsideClick, 根据返回值确定是否要隐藏组件
    // true: 隐藏 flase: 阻止隐藏
    outsideClick: function(selected){
        return !this.options.active || this.options.active == 'start';
    },
    // 用户点击了某一个选项, 如果 beforeChange 里的返回值为false, 那么可以阻止触发组件的afterChange方法
    // 最佳实践: 在 beforeChange 处理是否 触发选择项改变, 在afterChange处理 选择项改变
    beforeChange: function($that, selected, active){
        if (active == 'start') {
            var index = $that.index();
            this.options.active = 'end';
            this.elms.start.val($that.data("value"));
            this.elms.end.val('');
            // 将 index 小于当前选择元素的兄弟元素设置为不可点击
            $that.siblings().each(function(){
                if (index > $(this).index()) {
                    $(this).addClass("disabled");
                }
            })
        } else {
            this.options.active = 'start';
            this.elms.end.val($that.data("value"));
        }
        $that.addClass("selected");
    },
    // 处理 用户选择项改变 时的逻辑
    afterChange: function($that, selected, active){
        active == 'start' && this.hide();
    },
    // 组件已隐藏时
    afterHide: function(){
        this.options.active = 'start';
        this.elms.option.removeClass("selected").removeClass("disabled");
    }
});
```

- 多项选择器
<div class="iframe-box no-border" style="padding-bottom: 360px;position: relative; z-index: 99999;">
<div class="handlers">
    <div class="btn refresh">刷新示例</div>
    <div class="btn open">新窗口打开</div>
</div>
<iframe src="html/muilt-picker2.html" style="border: 0;width: 100%;min-width: 600px;min-height: 360px; position: absolute;"></iframe>
</div>
多项选择器 dom 结构

``` html
<div class="city-picker muilt-picker">
    <div class="picker-input-group">
        <input class="picker-input" type="text" name="" readonly>
    </div>
    <div class="picker-container">
        <ul class="select-group scroll-bar">
        </ul>
    </div>
</div>
```

多项选择器 js
``` js
$(".city-picker").muiltPicker({
    mede: 'muilt',
    // 隐藏组件时重置已选项? 
    resetSelected: false,
    // 生成dom结构
    generator: function(done){
        return ['北京', '上海', '广州', '深圳'].map(function(item, index){
            return '<li class="li-item" data-value="' + index + '">' + item + '</li>'
        }).join("");
    },
    // 自定义一些即将会用到的元素, 将它们合并到 this.elms
    customElms: function(source, context) {
        return {
            input: $(".picker-input", source)
        }
    },
    // 在组件外点击时, 会调用outsideClick, 根据返回值确定是否要隐藏组件
    // true: 隐藏 flase: 阻止隐藏
    outsideClick: function(selected){
        return selected.length > 0;
    },
    // 用户点击了某一个选项, 如果 beforeChange 里的返回值为false, 那么可以阻止触发组件的afterChange方法
    // 最佳实践: 在 beforeChange 处理是否 触发选择项改变, 在afterChange处理 选择项改变
    beforeChange: function($that, selected, active) {
        if (selected.length >= 3 && !$that.hasClass("selected")) return false;
        $that.toggleClass("selected");
    },
    // 用户选择项改变
    afterChange: function($that, selected, active){
        this.elms.input.val(selected.map(function(item){
            return $(item).text();
        }).join());
    }
});
```
