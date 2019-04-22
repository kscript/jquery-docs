jQuery && (function ($) {
    $.fn.extend({
        /**
         * 提交表单
         * @func
         * @param {object} option ajax配置 
         * 
         * @param {object=} settings 配置信息 (可以不传settings)
         * @param {string=} settings.submit 提交按钮 (选择器一般应保持唯一)
         * @param {boolean=} settings.isBubble 从触发提交事件的按钮往上找表单
         * @param {string=} settings.disabledClass 提交按钮上有此class时, 默认阻止提交
         * @param {boolean=} settings.preventDefault 是否取消事件默认行为
         * 
         * @param {function=} successFn 回调 successFn(response, $event); 比$.http多一个点击提交按钮事件的 $event 参数
         * @param {function=} errorFn 回调 errorFn(error, $event); 比$.http多一个点击提交按钮事件的 $event 参数
         * @example
         * $("#register-form").formSubmit(
            * // option
            * {
            *     url: '/auth',
            *     type: 'post',
            *     // 没有data属性时, 取表单的serializeArray提交, 不想提交整个的话, 应该提供一个获取实时数据的方法 
            *     data: function () {
            *         return {
            *             mobile: $("#register-form").find("[name='mobile']").val()
            *         }
            *     }
            * },
            * // settings
            * {
            *     submit: ".submit",
            *     isBubble: true,
            *     preventDefault: true,
            * },
            * // success
            * function(response, $event){
            * },
            * // error
            * function(error, $event){
            * });
            */
        formSubmit: function (option, settings, success, error) {
            var container = this;
            var args = arguments;
            var successFn, errorFn;
            var formSubmit = container.data("formSubmit");
            if (typeof args[1] == 'function') {
                successFn = args[1];
                errorFn = args[2];
                settings = null;
            } else {
                successFn = success;
                errorFn = error;
            }
            return arguments.length ? instance() : formSubmit || instance();
            function instance() {
                settings = $.extend({
                    form: '.form',
                    submit: ".submit",
                    disabledClass: 'disabled',
                    validate: true,
                    isBubble: true,
                    preventDefault: true,
                    // 提交状态, ready/pending, 一般作为只读属性
                    state: "ready"
                }, settings);
                var result;
                var ajaxOption = function (form, option) {
                    // 读取表单上的属性
                    var formOption = {
                        url: form.attr('action'),
                        type: form.attr('method'),
                        contentType: form.attr('enctype'),
                    }
                    // 依次合并: 默认值,表单属性,用户传参
                    result = $.extend({
                        url: '',
                        type: 'POST',
                        dataType: 'json',
                        beforeSend: function () {
                            return true;
                        }
                    },
                        option,
                        formOption
                    );
                    var data = (option || {}).data;
                    if (typeof data == 'function') {
                        result.data = data(form);
                    } else {
                        result.data = result.data || form.serializeArray();
                    }
                    return result;
                }
                
                var submit = function ($event) {
                    // $event 
                    // 如果是jQuery包装过的event, 那么可以看作用户点击了提交按钮
                    // 如果不是, 可以看作是用户在验证通过的表单的元素上按下了Enter, 间接地触发了提交动作
                    var that = $event instanceof Object && $event.originalEvent instanceof MouseEvent ? $(this) : $(settings.submit, settings.container || container);
                    var form = settings.isBubble ? that.closest("form") : $(settings.form, settings.container || container);
                    var submitOption = ajaxOption(form, option);
                    var beforeSend = submitOption.beforeSend;
                    submitOption.beforeSend = function (xhr, option) {
                        var disabled = that.hasClass(settings.disabledClass);
                        var res = beforeSend ? beforeSend(xhr, option, form) : true;
                        // 如果没有拦截提交, 且设置了需要验证
                        if (!beforeSend && settings.validate) {
                            // 尝试验证表单
                            try {
                                res = form.valid();
                            } catch (e) {
                                console.log(e);
                            }
                        }
                        if (!disabled && res) {
                            return true;
                        } else {
                            settings.state = 'ready';
                            return false;
                        }
                    }
                    if (settings.state == 'ready') {
                        settings.state = 'pending';
                        $.http(submitOption, function (response) {
                            settings.state = 'ready';
                            typeof successFn == 'function' && successFn(response, $event);
                        }, function (error) {
                            settings.state = 'ready';
                            typeof errorFn == 'function' && errorFn(error, $event);
                        });
                    }
                    if (settings.preventDefault) {
                        return false;
                    }
                }

                container.data("formSubmit", result = {
                    settings: settings,
                    submit: submit
                });
                // 修改表单的默认行为, 当用户在表单元素上按下enter触发提交时, 模拟用户点击了提交按钮
                container.find("form").on("submit", function () {
                    $(settings.submit, this).eq(0).trigger("click");
                    return false;
                });
                container.off("click", submit).on("click", settings.submit, submit);

            }
        }
    });
})(jQuery);
