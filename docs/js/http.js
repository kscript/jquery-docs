jQuery && (function ($) {
    $.extend({
        /**
     * 发起http请求
     * @func
     * @param {object} options 请求信息  
     * @param {object=} settings 自定义设置  (没有时可以省略)
     * @param {function=} successFn 回调
     * @param {function=} errorFn 回调
     */
    http: function (options, settings, success, error) {

        options = options || {};

        var args = arguments;
        var successFn, errorFn;
        var defaultSettings = {
            retry: 3,
            showError: true,
            toast: 'toast'
        }

        var holder = packing(['action', 'method', 'success', 'error', 'dataFilter'], options);
        // 如果第一个参数是function, 那么说明没有传settings
        if (typeof args[1] == 'function') {
            successFn = args[1];
            errorFn = args[2];
            settings = null;
        } else {
            successFn = success;
            errorFn = error;
        }
        // 兼容下 在options中写success/error的情况
        if (!successFn && holder.success) {
            successFn = holder.success;
        }
        if (!errorFn && holder.error) {
            errorFn = holder.error;
        }
        settings = $.extend({}, defaultSettings, settings || {});

        // 避免用户传错误的类型, 重新覆盖为默认值
        if (typeof settings.retry != "number") {
            settings.retry = defaultSettings.retry;
        }

        options = $.extend({
            url: '',
            type: 'get',
            dataType: 'json',
            timeout: 30000,
            dataFilter: function(data) {
                if (!holder.dataFilter) {
                    return data;
                }
                var result = holder.dataFilter.call(options, JSON.parse(data));
                if (typeof result === 'string') {
                    return result;
                } else if (result instanceof Object) {
                    return JSON.stringify(result);
                } else {
                    return data;
                }
            },
            success: function (response) {
                if (typeof settings.mock === 'function') {
                    response = settings.mock.apply(options, arguments) || response;
                }
                successHandler.call(this, response);
            },
            error: function (error, status) {
                if (status === 'timeout') {
                    if (--settings.retry > 0) {
                        $.http(options, settings, successFn, errorFn);
                    } else {
                        showSwal({
                            type: "error",
                            confirmButtonText: '好',
                            text: "请求超时"
                        }, function (handler) {
                            errorFn && errorFn.apply(self, arguments);
                        });
                    }
                } else {
                    errorHandler.apply(this, arguments);
                }
            }
        }, {
            url: holder.action,
            type: holder.method
        }, options);

        if (options.data instanceof FormData) {
            options = $.extend({
                processData: false,
                contentType: false
            }, options);
        }

        function successHandler(response) {
            var self = this;
            if (response.status < 0) {
                // 请求正常, 但服务端报错
                showSwal({
                    type: "error",
                    confirmButtonText: '好',
                    text: response.msg
                }, function (handler) {
                    // 错误回调, 将第一个参数设置为null
                    errorFn && errorFn.call(self, null, response);
                });
            } else {
                try{
                    var toast = settings.toast;
                    if (!holder.dataFilter && toast && response[toast]) {
                        // var xhr = JSON.parse(localStorage.getItem(toast + '_xhr')) || [];
                        // var data = ($.isArray(xhr) ? xhr : [xhr]).concat(response[toast]);
                        // localStorage.setItem(toast + '_xhr', JSON.stringify(data));
                        $.toast && $.toast({
                            list: response[toast]
                        });
                    }
                } catch(e) {
                    console.log(e);
                }
                successFn && successFn.call(self, response);
            }
        }
        function errorHandler(error, status) {
            var self = this;
            var args = arguments;
            // 返回数据解析出错
            if (status === 'parsererror') {
                showSwal({
                    type: "error",
                    confirmButtonText: "好",
                    text: "数据解析失败"
                }, function (handler) {
                    errorFn && errorFn.apply(self, args);
                });
            // 请求时出错
            } else if (settings.showError) {
                showSwal({
                    type: "error",
                    confirmButtonText: '好',
                    text: (error.responseJSON || {}).msg || "请求失败, 请稍后重试"
                }, function (handler) {
                    errorFn && errorFn.apply(self, args);
                });
            } else {
                errorFn && errorFn.apply(self, args);
            }
        }

        function packing(keys, obj) {
            var newObj = {};
            $.each(keys, function (index, item) {
                newObj[item] = obj[item];
                delete obj[item];
            });
            return newObj;
        }
        function showSwal(options, done) {
            if (swal && options) {
                swal(options).then(function (isConfirm) {
                    done && done('confirm');
                }).catch(function () {
                    done && done('cancel');
                });
            } else {
                done && done();
            }
        }
        return $.ajax(options);
    },
    });
})(jQuery);
