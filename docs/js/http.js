jQuery && (function ($) {
    $.extend({
        /**
         * 发起http请求
         * @func
         * @param {object} option 请求信息  
         * @param {object=} settings 自定义设置  (没有时可以省略)
         * @param {function=} successFn 回调
         * @param {function=} errorFn 回调
         */
        http: function (option, settings, success, error) {
    
            option = option || {};
    
            var args = arguments;
            var successFn, errorFn;
            var defaultSettings = {
                retry: 3,
                showError: true
            }
    
            var holder = packing(['action', 'method', 'success', 'error'], option);
            
            if (typeof args[1] == 'function') {
                successFn = args[1];
                errorFn = args[2];
                settings = null;
            } else {
                successFn = success;
                errorFn = error;
            }
            // 兼容下 在option中写success/error的情况
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
    
            option = $.extend({
                url: '',
                type: 'get',
                dataType: 'json',
                success: function (response) {
                    successHandler.call(this, response);
                },
                error: function (error) {
                    if (--settings.retry > 0) {
                        $.http(option, settings, successFn, errorFn);
                    } else {
                        errorHandler.apply(this, arguments);
                    }
                }
            }, {
                url: holder.action,
                type: holder.method
            }, option);
    
            if (option.data instanceof FormData) {
                option = $.extend({
                    processData: false,
                    contentType: false
                }, option);
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
                    // if (response.tips) {
                    //     localStorage.setItem("tips", JSON.stringify(response.tips));
                    // }
                    successFn && successFn.call(self, response);
                }
            }
            function errorHandler(error) {
                var self = this;
                var args = arguments;
                // 返回数据解析出错
                if (error.status == 200 && error.readyState === 4) {
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
            function showSwal(option, done) {
                if (swal && option) {
                    swal(option).then(function (isConfirm) {
                        done && done('confirm');
                    }).catch(function () {
                        done && done('cancel');
                    });
                } else {
                    done && done();
                }
            }
            return $.ajax(option);
        }
    });
})(jQuery);
