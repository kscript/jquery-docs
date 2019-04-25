jQuery && (function ($) {
    $.extend({
        /**
         * 显示提示信息
         * @param {object=} option 
         * @param {number=3000} option.interval 间隔时间(超出自动关闭当前提示)
         * @param {string="toast"} option.key 提示信息在localStorage的key
         * @param {array=[]} option.list 要显示的信息的列表 (该属性有传入值时, 不会再去 localStorage 里获取)
         * @param {function=} option.verify 验证是否满足触发条件
         * @param {function=(item)} option.getText 取出要显示的信息
         * @param {function=(text, done, item)} option.show 提示信息的显示方式
         * @param {function=(index)} option.close 当前提示信息已关闭时
         * @param {function=} option.complete 提示信息已全部显示完时
         */
        toast: function(option) {
            if (this.toast.instance) return this.toast.instance;
            return this.toast.instance = $.extend({
                interval: 3000,
                key: 'toast',
                list: [],
                getText: function(item) {
                    if (typeof item === 'string') {
                        return item;
                    } else if(item instanceof Object) {
                        if (typeof item.a == 'string') {
                            return item.a;
                        }
                    }
                },
                init: function(){
                    try {
                        var list = $.isArray(this.list) && this.list.length ? this.list : JSON.parse(localStorage.getItem(this.key));
                        this.list = $.isArray(list) ? list : [list];
                        this.start();
                    } catch (e) {
                        console.log(e);
                    }
                    return this;
                },
                verify: function(){
                    return this.list.length && /toast/.test(location.hash);
                },
                start: function() {
                    var that = this;
                    if (this.verify()) {
                        this.queue(this.list, 0, this.complete);
                    }
                    return this;
                },
                queue: function (data, index, done) {
                    var that = this;
                    index = index || 0;
                    if (data.length <= index) {
                        // 完成时重新绑定this并执行
                        done && done.call(this);
                    } else {
                        var text = this.getText(data[index]);
                        that.show(text, function(){
                            swal && swal.close();
                            that.close(index);
                            that.queue(data, index + 1, done);
                            // 备用参数 
                        }, data[index]);
                    }
                    return this;
                },
                show: function (text, done, item){
                    if (text && swal) {
                        swal({
                            type: 'info',
                            timer: this.interval,
                            text: text
                        }).then(done).catch(done);
                    } else {
                        done && done();
                    }
                    return this;
                },
                close: function(index){
                },
                complete: function(){
                    localStorage.removeItem(this.key);
                    return this;
                }
            }, option || {}).init();
        }
    });
})(jQuery);
