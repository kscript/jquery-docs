jQuery && (function ($) {
    $.fn.extend({
        /**
         * 放置元素的盒子
         * @param {object} option 
         * @param {string} option.container 组件容器
         * @param {string} option.item 生成元素容器
         * @param {string} option.tag 超出时的提示元素
         * @param {string} option.text 提示文本
         * @param {number} option.height 容器高度 不传或为0时, 默认使用组件容器高度
         * @param {number} option.scale 容差比例
         * @param {object} option.containerStyle
         * @param {object} option.itemStyle
         * @param {object} option.tagStyle
         */
        elementBox: function(option, context){
            var that = $(context || this);
            if (!that.data("elementBox")) {
                that.data("elementBox", instance(option || {}, that));
            }
            return $(this).data("elementBox");
            function instance(option, context) {
                return {
                    context: context,
                    option: $.extend({
                        container: '.overflow-box',
                        item: '.overflow-item',
                        tag: '.overflow-tag',
                        text: '...',
                        tagStyle: {},
                        itemStyle: {},
                        containerStyle: {},
                        height: 0,
                        scale: 1.5
                    }, option),
                    elms: {},
                    selectElms: function(context, option){
                        var that = this;
                        var elms = {};
                        context = context || that.context;
                        elms.container = $(that.option.container, context);
                        if (!elms.container.length) {
                            elms.container = context;
                        }
                        $.each(['tag', 'item'], function(key, item){
                            elms[item] = $(that.option[item], context);
                        });
                        return elms;
                    },
                    init: function() {
                        var that = this;
                        that.elms = that.selectElms(that.context, option);
                        if (!option.height) {
                            that.option.height = that.elms.container.height();
                        }
                        that.elms.container.css($.extend({
                            height: that.option.height,
                            width: that.option.width || '100%',
                            position: 'relative',
                            overflow: "hidden",
                            display: "block"
                        },that.option.containerStyle));
                        that.elms.item.css($.extend({
                            paddingRight: 15,
                            height: 'auto',
                            overflow: 'initial'
                        }, that.option.itemStyle));
                        that.elms.tag.css($.extend({
                            position: "absolute",
                            top: -6,
                            right: 0,
                            zIndex: 9999,
                            color: "#333",
                            width: 15,
                            fontSize: 18,
                            display: "none",
                            cursor: 'pointer'
                        }, that.option.tagStyle));
                        that.addEvent();
                        return that;
                    },
                    addEvent: function(){
                        var that = this;
                        if (!$(that.elms.item).data("elementBoxEvent")) {
                            $(that.elms.item).data("elementBoxEvent", function(){
                                that.compute();
                            });
                        } else {
                            $(that.elms.item).off('DOMNodeInserted DOMNodeRemoved', $(that.elms.item).data("elementBoxEvent"));
                        }
                        $(that.elms.item).on('DOMNodeInserted DOMNodeRemoved', $(that.elms.item).data("elementBoxEvent"));
                    },
                    compute: function(target){
                        var over = false;
                        var elms = target ? this.selectElms($(target), this.option) : this.elms;
                        if (elms.item.height() > this.option.height * this.option.scale || elms.item.width() > elms.container.width()) {
                            elms.tag.text(this.option.text).show();
                            elms.container.addClass("over");
                            over = true;
                        } else  {
                            elms.tag.text('').hide();
                            elms.container.removeClass("over");
                        }
                        this.option.change && this.option.change(over);
                        return this;
                    },
                    remove: function($el) {
                        this.elms.item.remove($el);
                        this.compute();
                        return this;
                    },
                    add: function($el){
                        this.elms.item.append($el);
                        this.compute();
                        return this;
                    },
                    html: function(html) {
                        this.elms.item.html(html);
                        this.compute();
                        return this;
                    }
                }.init();
            }
        },
    });
})(jQuery);
