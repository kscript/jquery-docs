$.fn.extend({
    actionSheet: function (options) {
        options = $.extend({
            title: '',
            mode: 'text',
            defer: 300,
            items: [
                // {text: ''}
            ],
            outsideClose: true,
            cancelButtonText: '取消',
            showCancelButton: true,
            close: function (type) {},
            confirm: function () {},
            cancel: function () {},
            create: function () {}
        }, options);
        // @ts-ignore
        var $that = $(this);
        var instance = {};
        var mode = options.mode === 'text' ? 'text' : 'html';
        var html = $('<div class="action-sheet">\
            <div class="action-sheet__overlay"></div>\
            <div class="action-sheet__container">\
                <div class="action-sheet__header"><div class="action-sheet__title"></div></div>\
                <div class="action-sheet__body">\
                </div>\
                <div class="action-sheet__footer">\
                    <div class="action-sheet__cancel"></div>\
                </div>\
            </div>\
        </div>');
        var elems = {
            html: html,
            header: $('.action-sheet__header', html),
            title: $('.action-sheet__title', html),
            container: $('.action-sheet__container', html),
            body: $('.action-sheet__body', html),
            cancel: $('.action-sheet__cancel', html),
            overlay: $('.action-sheet__overlay', html),
            footer: $('.action-sheet__footer', html)
        }
        $that.data('action-sheet', instance);
        // @ts-ignore
        var close = function (type) {
            return function () {
                type = type || 'close';
                html.removeClass('action-sheet--active');
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
                // @ts-ignore
                options.confirm.call(instance, options.items[$(this).index()], $(this).index());
            }
        }
        $.extend(instance, {
            elems: elems,
            options: options,
            close: close
        })
        html.appendTo($(options.target || document.body));
        elems.header[options.title ? 'show' : 'hide']();
        elems.title[mode](options.title);
        elems.cancel[options.showCancelButton ? 'show' : 'hide']()[mode](options.cancelButtonText);
        $.each(options.items, function (index, item) {
            var text = item instanceof Object ? item.text : item;
            if (text && typeof text === 'string') {
                elems.body.append('<div class="action-sheet__item">' + text + '</div>');
            }
        });
        if (typeof options.create === 'function') {
            options.create.call(instance, html);
        }
        elems.body.on('touchstart', '.action-sheet__item', confirm);
        elems.cancel.on('touchstart', close('cancel'));
        if (options.outsideClose) {
            elems.overlay.on('touchstart', close('close'));
        }
        setTimeout(function () {
            html.addClass('action-sheet--active');
        }, 0);
        return instance;
    }
})