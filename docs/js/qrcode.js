jQuery && (function ($) {
    $.fn.extend({
        qrcode: function (options) {
            if (!$(this).length) {
                return ;
            }
            if (!this.data("qrcode")) {
                this.data("qrcode", instance.call(this, options).init());
            }
            return this.data("qrcode");
            function instance(options) {
                var done = options.done;
                var verify = options.verify;
                var error = options.error;
                var merge = options.merge;
                var dafaultOptions = {
                    container: $(this).get(0),
                    QRCode: null,
                    key: '',
                    starttime: 0,
                    timeid: 0,
                    createKey: function (len, radix) {
                        var str = '';
                        len = len <= 0 ? 64 : len;
                        radix = !radix || radix > 36 || radix <= 2 ? 36 : ~~radix;
                        while (len-- > 0) {
                            str += (~~(Math.random() * radix)).toString(radix);
                        }
                        return str;
                    }
                }
                return $.extend(dafaultOptions, {
                    http: $.extend({
                    }, options.http),
                    qrcode: $.extend({
                        height: 120,
                        width: 120
                    }, options.qrcode),
                    params: $.extend({}, options.params),
                    settings: $.extend({
                        expire: 0,
                        interval: 1000
                    }, options.settings),
                    paramData: $.extend({
                        a: 'codeLogin',
                    }, options.paramData),
                    init: function () {
                        if (typeof verify !== 'function') {
                            console.log('请设置verify方法');
                            return this;
                        }
                        this.key = this.createKey(64);
                        if (QRCode) {
                            $(this.container).html('');
                            this.QRCode = new QRCode(this.container, this.qrcode);
                            this.makeCode();
                            this.starttime = +new Date;
                            this.query();
                        }
                        return this;
                    },
                    query: function () {
                        var that = this;
                        var params = $.extend({}, that.http);
                        if (typeof params.data === 'function') {
                            params.data = params.data.call(this);
                        }
                        $.http(params, {
                            showError: false
                        }, function (data) {
                            if (verify.call(that, data)) {
                                done && done.call(that);
                            } else {
                                that.timer();
                            }
                        }, function() {
                            typeof error === 'function' && error.apply(that, arguments)
                        });
                    },
                    timer: function(){
                        var that = this;
                        that.timeid = setTimeout(function () {
                            if (!that.settings.expire || that.starttime + that.settings.expire > new Date) {
                                that.query();
                            } else {
                                that.init();
                            }
                        }, that.settings.interval);
                        return that;
                    },
                    makeCode: function () {
                        var that = this;
                        myParams(this.params, function (data) {
                            var result;
                            if (typeof merge === 'function') {
                                result = merge.call(that, data) || {};
                            } else {
                                result = $.extend({}, that.paramData, {
                                    key: that.key,
                                    token: token,
                                    data: data.json
                                });
                            }
                            that.QRCode.makeCode(JSON.stringify(result));
                        });
                    }
                });
            }
        }
    })
})(jQuery);
