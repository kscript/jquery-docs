jQuery && (function ($) {
    $.fn.extend({
        muiltPicker: function (options) {
            options = options || {};
            if ($(this).length > 1) {
                var pickers = [];
                $(this).each(function () {
                    pickers.push(instance.call(this, options));
                });
                return pickers[0];
            } else {
                return instance.call(this, options);
            }
            function instance(options) {
                var source = $(this);
                var muiltPicker = source.data("muiltPicker");
                // 当已初始化过时
                if (muiltPicker) {
                    if (typeof options == 'object') {
                        muiltPicker.setOptions(options);
                    }
                    return muiltPicker
                }
                var defaults = {
                    // range/muilt
                    mode: 'range',
    
                    // ----- 选择器 -----
    
                    // 是否在组件内部查询选择器
                    // true: 组件内查询 false: 全局查询
                    inner: true,
    
                    // 组件ui容器 (存在于组件内部, 忽略inner)
                    container: '.picker-container',
                    // 列表选择器 (存在于组件内部, 忽略inner)
                    selectSelecotr: '.select-group',
                    optionSelecotr: '.li-item',
                    scrollSelecotr: '.scroll-bar',
    
                    // 用于激活组件的元素
                    triggerSelecotr: ".picker-input-group",
    
                    // ----- 其它 -----
                    // 设置为内联时, 组件内将不会调用关闭
                    inline: false,
                    containerWidth: '100%;',
                    scrollBarHeight: '240px',
                    // 激活组件时自动显示container
                    autoShow: true,
                    // 鼠标移出时关闭
                    leaveClose: false,
                    // customElms: function(){return {}},
                    // plugins: {
                    //         options: function(options){},
                    //         compiler: function(picker){
                    //              console.log(arguments); 
                    //         }
                    // },
    
                    // 有自定义函数时, 只保留生命周期/插件配置, 将控制权交给自定义函数
                    // custom: function () { console.log(this) },
    
                    // ----- 组件逻辑 -----
    
                    // 生成数据的方式: 异步回调/同步
                    // 当async为true时, 需要在generator内调用done才可以继续向下执行
                    async: false,
                    // 用于生成选择列表的函数 不为函数时, 默认使用html中的结构, done: 异步时的回调, 需要将同步时的返回值作为参数传递给done
                    // generator: function(done){ /* done('<li class="li-item" data-value="1000">1000</li>') */return '<li class="li-item" data-value="1000">1000</li>' },
                    beforeShow: function () { },
                    clear: null, // function(){},
                    // 点击组件外时, 是否可以自动关闭
                    autoClose: false,
                    // 点击外部时触发, 返回一个是否可以关闭的boolean.
                    // selected: 用户选择过的选项
                    outsideClick: function (selected) { return selected.length === 0 },
                    // 每次隐藏时是否重置选择
                    resetSelected: true,
                    // 当前选择类型
                    active: 'start',
                    // 选择值改变时触发
                    beforeChange: function ($that, selected, active) { },
                    afterChange: function ($that, selected, active) { },
                }
                var selected = [];
                var picker = {};
    
                execCommand('beforeInit');
    
                $.extend(picker, plugins(options, source));
    
                custom(picker);
    
                source.data("muiltPicker", picker);
    
                execCommand('afterInit');
                /**
                 * 获取最终的配置项
                 * @func
                 * @param {object} options $.fn.muiltPicker 传来的配置项
                 * @param {object} source 多项选择器绑定的jQuery对象
                 */
                function getOptions(options, source) {
                    selected = [];
                    options = $.extend(getDefaultOptions(defaults, source.data()), options);
                    var picker = {};
                    var context = options.inner ? source : document;
                    var elms = {
                        source: source,
                        container: $(options.container, source),
                        scroll: $(options.scrollSelecotr, source),
                        select: $(options.selectSelecotr, source),
                        option: $(options.optionSelecotr, source),
                        trigger: $(options.triggerSelecotr, context)
                    }
                    var events = {
                        triggerSelecotrClick: [],
                        autoClose: [],
                        liItemClick: []
                    }
                    // execCommand 方法 不可以在picker变量未声明前执行
                    // picker 中 除了 setOptions/destroy 方法返回options之外, 都返回this
                    picker = $.extend(picker, {
                        bus: {},
                        state: 'hide',
                        elms: elms,
                        source: source,
                        options: options,
                        context: context,
                        plugins: [],
                        events: events,
                        setEvents: setEvents,
                        addEvent: addEvent,
                        offEvent: offEvent,
                        setOptions: setOptions,
                        show: function () {
                            execCommand('beforeShow');
                            this.elms.container.show();
                            this.state = 'show';
                            execCommand('afterShow');
                            return this;
                        },
                        clear: function () {
                            var elms = this.elms;
                            // 先调用用户设置的clear方法, 如果执行结果为false, 且是range模式, 那么触发默认的清除功能
                            if (!execCommand('clear') && this.options.mode === 'range') {
                                $.each([
                                    'startEl',
                                    'endEl',
    
                                    'startLabel',
                                    'splitLabel',
                                    'endLabel'
                                ], function (index, item) {
                                    if (index < 2) {
                                        elms[item].val('')
                                    } else {
                                        elms[item].text('');
                                    }
                                })
                            }
                            return this;
                        },
                        destroy: function () {
                            this.clear();
                            for (var key in this.events) {
                                this.offEvent.apply(null, this.events[key]);
                            }
                            for (var i in this) {
                                delete this[i];
                            }
                            this.source.removeData("muiltPicker");
                            execCommand('destroy');
                        },
                        hide: function () {
                            if (options.inline) {
                                return this;
                            }
                            if (typeof options.beforeHide != 'function' || execCommand('beforeHide', [selected])) {
                                if (this.options.resetSelected) {
                                    selected.splice(0);
                                }
                                this.elms.container.hide();
                                this.state = 'hide';
                                execCommand('afterHide');
                            }
                            return this;
                        },
                        setHtml: function (done) {
                            var self = this;
                            if (this.options.async) {
                                typeof this.options.generator == 'function' && this.options.generator(function (html) {
                                    self.elms.select.html(html);
                                    done();
                                });
                            } else {
                                typeof this.options.generator == 'function' && this.elms.select.html(this.options.generator());
                                done();
                            }
                            return this;
                        },
                        setStyles: function () {
                            this.elms.container.css({
                                width: this.options.containerWidth
                            });
                            this.elms.scroll.css({
                                height: this.options.scrollBarHeight
                            });
                            return this;
                        }
                    });
                    $.extend(elms,
                        typeof options.customElms === 'function'
                            ? options.customElms.call(picker, source, context)
                            : {}
                    );
                    return picker;
                }
                /**
                 * 获取默认配置项
                 * @param {object} defaults 插件内置
                 * @param {object} data source.data()
                 */
                function getDefaultOptions(defaults, data) {
                    data = typeof data === 'object' ? data : {};
                    var result = {};
                    // 从data()上读取的配置
                    $.each(defaults, function (key, item) {
                        if (!(item instanceof Object) && typeof data[key] !== 'undefined') {
                            result[key] = data[key];
                        } else {
                            result[key] = item;
                        }
                    });
                    return result;
                }
    
                function plugins(options, source) {
                    var picker;
                    var plugins = options.plugins;
                    if (typeof plugins === 'object') {
                        execCommand('beforeRunPlugins');
                        if (typeof plugins.options === 'function') {
                            $.extend(options, plugins.options(options));
                        }
                        picker = getOptions(options, source);
                        if (typeof plugins.compiler === 'function') {
                            plugins.compiler(picker)
                        };
                        execCommand('afterRunPlugins');
                    } else {
                        picker = getOptions(options, source);
                    }
                    return picker;
                }
    
                function custom(picker) {
                    if (!picker.options.custom) {
                        picker.setHtml(function () {
                            picker.elms.option = $(picker.options.optionSelecotr, picker.source);
                            picker.setStyles();
                            picker.setEvents(picker);
                            picker.options.inline && picker.show();
                        });
                    } else {
                        execCommand('custom');
                    }
                }
    
                function setOptions(option) {
                    if (arguments.length) {
                        if (typeof option.customElms === 'function') {
                            $.extend(picker.elms,
                                typeof option.customElms === 'function'
                                    ? option.customElms.call(picker, picker.source, picker.context)
                                    : {}
                            );
                        }
                        return $.extend(picker.options, option);
                    }
                }
    
                function addEvent() {
                    var args = arguments;
                    if (args.length < 3) {
                        return [];
                    }
                    var selecotr = args[0];
                    var type = args[1];
                    var handler, element;
                    if (args.length === 3) {
                        handler = args[2];
                        $(selecotr).on(type, handler)
                    } else {
                        element = args[2];
                        handler = args[3];
                        $(selecotr).on(type, element, handler)
                    }
                    return [selecotr, type, element, handler];
                }
                function offEvent(selecotr, type, element, handler) {
                    if (element) {
                        $(selecotr).off(type, element, handler);
                    } else {
                        $(selecotr).off(type, handler);
                    }
                }
                function setEvents(picker) {
                    var events = picker.events;
                    var context = picker.context;
                    var options = picker.options;
                    var elms = picker.elms;
                    var source = picker.source;
                    events.leaveClose = addEvent(
                        $(context),
                        'mouseleave',
                        options.container,
                        function () {
                            options.leaveClose && picker.hide();
                        }
                    )
                    events.triggerSelecotrClick = addEvent(
                        $(context),
                        "click",
                        options.triggerSelecotr,
                        function () {
                            if (picker.state != 'show') {
                                $(this).closest(".is-empty").removeClass("is-empty");
                                options.autoShow && picker.show();
                                elms.select.scrollTop(0);
                            } else {
                                picker.hide();
                            }
                            return false;
                        }
                    );
                    events.autoClose = addEvent(
                        $(document),
                        "click",
                        function (e) {
                            var $target = $(e.target);
                            var $parent;
                            if ($target.hasClass("muilt-picker")) {
                                $parent = $target
                            } else if ($target.closest(".muilt-picker").length) {
                                $parent = $target.closest(".muilt-picker");
                            }
                            if (!$parent) {
                                if (options.autoClose || execCommand("outsideClick", [selected])) {
                                    if (!$parent || $parent[0] === source[0]) {
                                        elms.container.css("display") !== 'none' && picker.hide();
                                    }
                                }
                            }
                        }
                    );
                    events.liItemClick = addEvent(
                        source,
                        "click",
                        options.optionSelecotr,
                        function () {
                            if ($(this).hasClass("disabled")) { return false; }
                            if (typeof options.beforeChange === 'function' && options.beforeChange.call(picker, $(this), selected, options.active) === false) {
                                return false;
                            } else {
                                updateSelected(selected, this);
                            }
                            if (typeof options.afterChange == 'function') {
                                return options.afterChange.call(picker, $(this), selected, options.active);
                            }
    
                            return false;
                        }
                    );
                }
                function updateSelected(selected, element) {
                    var selectedIndex = selected.indexOf(element);
                    if (selectedIndex < 0) {
                        selected.push(element);
                    } else {
                        selected.splice(selectedIndex, 1);
                    }
                    return selected;
                }
                function execCommand(fname, args) {
                    return fname && typeof options[fname] === 'function' && options[fname].apply(picker, $.isArray(args) ? args : arguments.length > 1 ? [args] : []);
                }
    
                if ($.fn.muiltPicker.pickers && $.isArray($.fn.muiltPicker.pickers)) {
                    $.fn.muiltPicker.pickers.push(picker);
                } else {
                    $.fn.muiltPicker.pickers = [picker];
                }
                return picker;
            }
        }
    });
})(jQuery);
