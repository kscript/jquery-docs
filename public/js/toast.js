jQuery && (function ($) {
    $.extend({
        /**
         * 显示提示信息
         * @param {object=} options 
         * @param {number=3000} options.interval 间隔时间(超出自动关闭当前提示)
         * @param {array=[]} options.list 要显示的信息的列表 (该属性有传入值时, 不会再去 localStorage 里获取)
         * @param {string="toast"} options.key 提示信息在localStorage的key(从本地中读取)
         * @param {function=} options.verify 验证是否满足触发条件
         * @param {function=(item)} options.getText 取出要显示的信息
         * @param {function=(text, done, item)} options.show 提示信息的显示方式
         * @param {function=(index)} options.close 当前提示信息已关闭时
         * @param {function=} options.complete 提示信息已全部显示完时
         */
        toast: function (options) {
            if (this.toast.instance) return this.toast.instance.init(options);
            var funcs = {
                getText: function (item) {
                    if (typeof item === 'string') {
                        return item;
                    } else if (item instanceof Object) {
                        if (typeof item.a == 'string') {
                            return item.a;
                        }
                    }
                },
                verify: function () {
                    return this.list.length; //&& /toast/.test(location.hash);
                },
                start: function () {
                    if (this.verify()) {
                        this.queue(this.list, this.complete);
                    }
                    return this;
                },
                shift: function () {
                    try {
                        this.list.shift();
                        this.key && localStorage.setItem(this.key, JSON.stringify(this.list));
                    } catch (e) {
                        console.log(e);
                    }
                },
                queue: function (data, done) {
                    var that = this;
                    if (data.length == 0) {
                        // 完成时重新绑定this并执行
                        done && done.call(this);
                    } else {
                        var text = this.getText(data[0]);
                        that.show(text, function () {
                            swal && swal.close();
                            that.close(0);
                            that.queue(data, done);
                            // 备用参数 
                        }, data[0]);
                        that.shift();
                    }
                    return this;
                },
                show: function (text, done, item) {
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
                close: function (index) {
                },
                complete: function () {
                    this.key && localStorage.removeItem(this.key);
                    return this;
                }
            }
            var toast = {
                init: function (options) {
                    try {
                        $.extend(this, {
                            interval: 3000,
                            key: '',
                            list: [],
                        }, funcs, options);
                        if (this.key) {
                            var list, xhr;
                            if ($.isArray(this.list) && this.list.length) {
                                list = this.list;
                            } else {
                                list = JSON.parse(localStorage.getItem(this.key)) || [];
                                xhr = JSON.parse(localStorage.getItem(this.key + '_xhr')) || [];
                                list = ($.isArray(list) ? list : [list]).concat(xhr);
                            }
                            this.list = list;
                            localStorage.setItem(this.key, JSON.stringify(this.list));
                            localStorage.removeItem(this.key + '_xhr');
                        }
                        if ($.isArray(this.list)) {
                            this.start();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    return this;
                }
            };
            this.toast.instance = toast;
            return toast.init(options);
        }
    });
})(jQuery);
