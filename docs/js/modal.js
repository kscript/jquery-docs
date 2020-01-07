$.fn.extend({
    modal: function (options) {
        options = $.extend({
            // 标题为 非空字符串 时显示头部
            title: '',
            // info、warning、error、success
            type: 'info',
            // text、html
            mode: 'text',
            defer: 300,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            outsideClose: true,
            close: function (type) {},
            confirm: function () {},
            create: function () {}
        }, options);
        // @ts-ignore
        var $that = $(this);
        var instance = {};
        var mode = options.mode === 'text' ? 'text' : 'html';
        var html = $('<div class="modal">\
            <div class="modal__overlay"></div>\
            <div class="modal__container">\
                <div class="modal__header">\
                    <span class="modal__icon"></span><span class="modal__title"></span>\
                </div>\
                <div class="modal__body">\
                </div>\
                <div class="modal__footer">\
                    <div class="modal__cancel">取消</div>\
                    <div class="modal__confirm">确定</div>\
                </div>\
            </div>\
        </div>');
        // @ts-ignore
        var close = function (type) {
            return function () {
                type = type || 'close';
                html.removeClass('modal--active');
                setTimeout(function () {
                    html.remove();
                }, options.defer);
                if (typeof options.close === 'function') {
                    options.close.call(instance, type);
                }
                if (type !== 'confirm' && typeof options.cancel === 'function') {
                    options.cancel.call(instance);
                }
            }
        }
        var confirm = function () {
            close('confirm')();
            if (typeof options.confirm === 'function') {
                options.confirm.call(instance);
            }
        }
        var elems = {
            html: html,
            header: $('.modal__header', html),
            title: $('.modal__title', html),
            container: $('.modal__container', html),
            body: $('.modal__body', html),
            cancel: $('.modal__cancel', html),
            confirm: $('.modal__confirm', html),
            overlay: $('.modal__overlay', html),
            footer: $('.modal__footer', html)
        }
        $.extend(instance, {
            elems: elems,
            options: options,
            close: close
        });
        $that.data('modal', instance);
        html.appendTo($(options.target || document.body));
        elems.header[options.title ? 'show' : 'hide']();
        elems.title[mode](options.title);
        elems.body[options.message ? 'show' : 'hide']()[mode](options.message);
        elems.cancel[options.showCancelButton ? 'show' : 'hide']()[mode](options.cancelButtonText);
        elems.confirm[options.showConfirmButton ? 'show' : 'hide']()[mode](options.confirmButtonText);
        if (typeof options.type === 'string' && /^(info|warning|error|success)$/.test(options.type)) {
            $('.modal__icon', html).addClass('icon__' + options.type);
            html.addClass('modal__' + options.type);
        } else {
            $('.modal__icon', html).hide();
        }
        if (typeof options.create === 'function') {
            options.create.call(instance, html);
        }
        elems.confirm.on('touchstart', confirm);
        elems.cancel.on('touchstart', close('cancel'));
        if (options.outsideClose) {
            elems.overlay.on('touchstart', close('close'));
        }
        setTimeout(function () {
            html.addClass('modal--active');
        }, 0);
        return instance;
    }
});

$.extend({
    alert: function (message, callback, options) {
        options = $.extend({
            message: message,
            showCancelButton: false,
            outsideClose: false,
            close: callback
        }, options || {});
        return $(document).modal(options);
    },
    confirm: function (message, callback, options) {
        options = $.extend({
            message: message,
            outsideClose: false,
            close: function(type) {
                if (typeof callback === 'function') {
                    callback(type === 'confirm')
                }
            }
        }, options || {});
        return $(document).modal(options);
    }
});