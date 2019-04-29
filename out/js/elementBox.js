jQuery && (function ($) {
    $.extend({
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
                        option = option || this.option;
                        var elms = {};
                        $.each([
                            'container', 'tag', 'item'
                        ], function(key, item){
                            elms[item] = $(option[item], context);
                        });
                        return elms;
                    },
                    init: function() {
                        var that = this;
                        this.elms = this.selectElms(context);
                        if (!option.height) {
                            that.option.height = that.elms.container.height();
                        }
                        that.elms.container.css($.extend({
                            height: that.option.height,
                            position: 'relative',
                            overflow: "hidden",
                            display: "block"
                        },that.option.containerStyle));
                        this.elms.item.css($.extend({
                            paddingRight: 15,
                            height: 'auto',
                            overflow: 'initial'
                        }, that.option.itemStyle));
                        that.elms.tag.css($.extend({
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 9999,
                            color: "#333",
                            width: 15,
                            fontSize: 18,
                            display: "none",
                            cursor: 'pointer'
                        }, that.option.tagStyle));
                        return that;
                    },
                    compute: function(target){
                        var over = false;
                        var elms = target? this.selectElms($(target), this.option) : this.elms;
                        if (elms.item.height() > this.option.height * this.option.scale) {
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
