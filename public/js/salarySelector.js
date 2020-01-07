$.fn.salarySelector = function (options) {
    var instances = [];
    $(this).each(function () {
        options = $.extend({
            initVal: [],
            lineHeight: 28,

            containerClass: 'salarySelector',
            itemClass: 'salary_item',
            startClass: 'salary_start',
            endClass: 'salary_end',
            selectedClass: 'selected',
            disabledClass: 'disabled',
            
            htmlStr: '',
            startStr: '<div class="scroller salary_start left">',
            endStr: '<div class="scroller salary_end left">',
            closeStr: '</div>',
            itemsStr: '<p class="salary_item selected" data-val="1000">1千</p>\n',

            createHtml: function () { },
            onsave: function () { },
            onselect: function () { }
        }, options);

        var that0 = this;
        var ops = options;
        var height = ops.lineHeight;

        var html = ops.htmlStr || '<div class="' + ops.containerClass + '">';

        var selectedClass = ops.selectedClass;
        var disabledClass = ops.disabledClass;

        var initVal = ops.initVal;
        var instance = {};
        var container;

        html = typeof ops.createHtml === 'function' ? ops.createHtml() : '';
        html = html || (html + ops.startStr + ops.itemsStr + ops.closeStr + ops.endStr + ops.itemsStr + ops.closeStr);

        $(that0).next(T('{container}')).remove();
        $(that0).after(html);
        container = $(that0).next(T('{container}'));

        $(that0).data("mulit-picker", $.extend(instance, {
            html: html,
            selector: $(that0),
            container: container,
            options: ops,
            setVal: setVal,
            toolBtns: $(that0).siblings('.tool_btns'),
            scrollHandler: scrollHandler
        }));

        $(that0).siblings('.tool_btns').find('.tool_btn_comfirm').click(function () {
            var vals = $(that0).val().split(',');
            if (typeof ops.onsave === 'function') {
                ops.onsave.call(that0, vals);
            }
        });
        $(that0).siblings('.tool_btns').find('.tool_btn_clear').click(function () {
            $(that0).val('');
            container
            .find('.scroller')
            .data('clearSelector', 1).scrollTop(0)
            .children(T('{selected}')).removeClass(selectedClass)
            .end()
            .children(T('{disabled}')).removeClass(disabledClass);
        });
        setTimeout(function () {
            setVal(initVal, height, container);
            container.find('.scroller').scroll(function () {
                if ($(this).data("clearSelector")) {
                    return $(this).removeData("clearSelector");
                }
                var that = this;
                var t1 = $(that).scrollTop();
                setTimeout(function isScrollEnd() {
                    var t2 = $(that).scrollTop();
                    // 当相等了，说明滚动停止了
                    if (t2 === t1) {
                        // 大于等于一半高度则向上取整
                        if (t2 % height > height / 2) {
                            $(that).scrollTop(Math.ceil(t2 / height) * height);
                        } else {
                            $(that).scrollTop(Math.floor(t2 / height) * height);
                        }
                        scrollHandler(that);
                    }
                }, 500);
            });
        }, 600);
        function setVal(initVal, height, context) {
            if (initVal && initVal.length) {
                var selectStart = $$('{start} {item}[data-val="'+ initVal[0] + '"]', context);
                var selectEnd = $$('{end} {item}[data-val="' + initVal[1] + '"]', context);

                selectStart.addClass(selectedClass).siblings(T('{item}')).removeClass(selectedClass);
                $$('{start}', context).scrollTop(selectStart.index() * height);

                selectEnd.addClass(selectedClass).siblings(T('{item}')).removeClass(selectedClass);
                $$('{end}', context).scrollTop(selectEnd.index() * height);
            }
        }
        function scrollHandler (that) {
            var index = $(that).scrollTop() / height;
            var isStart = $(that).hasClass(ops.startClass);
            var start = isStart ? $(that).children(T('{item}')).eq(index) : $$('{start} {item}{selected}', container);
            var startVal = start.attr('data-val');
            $(that).children(T('{item}')).eq(index).addClass(selectedClass).siblings(T('{item}')).removeClass(selectedClass);

            var end = $$('{end} {item}{selected}', container);
            if (start.index() > end.index()) {
                end.removeClass(selectedClass);
                end = $$('{end} {item}', container).eq(start.index()).addClass(selectedClass);
                end.parent().scrollTop(start.index() * height);
            }
            var endVal = end.attr('data-val');
            $(that0).val(startVal + ',' + endVal);

            var selectedIndex = start.index();
            $$('{end} {item}', container).each(function(index, item){
                if (index < selectedIndex) {
                    $(this).addClass(ops.disabledClass);
                } else {
                    $(this).removeClass(ops.disabledClass);
                }
            });
            if (typeof ops.onselect === 'function') {
                ops.onselect.call(that, [startVal, endVal]);
            }
        }
        // 双$函数会对选择器进行转换
        function $$(str, context) {
            return $(typeof str === 'string' ? T(str) : str, context);
        }
        // 从options配置中, 尝试转换class选择器(如果存在)
        function T(str) {
            return str.replace(/\{(.*?)\}/g, function(s, $1) {
                // 不管options中是否存在, 一律加前缀.
                return '.' + (ops[$1 + 'Class'] || $1);
            });
        }
        instances.push(instance);
    });
    return instances;
};