function batchTask(option) {
    option = $.extend({
        // 同时执行任务数, >0
        max: 5,
        // 不大于0时, 表示不设置
        timeout: 0,
        // 任务队列
        queue: [],
        // 不为函数时忽略
        stateChange: function(state, data, index, err, res){},
        // 不为函数时忽略
        task: function(data, success, error) {},
        done: function() {}
    }, option);

    option.queue = $.isArray(option.queue) ? option.queue : [];
    option.stateChange = typeof option.stateChange === 'function' ? option.stateChange : function(){}
    var max = typeof option.max === 'number' && option.max > 0 ? option.max : 5;
    var timeout = {}
    var states = []
    return ({
        index: 0,
        max: max,
        active: 0,
        length: option.queue.length,
        complete: 0,
        option: option,
        cancel: function(index) {
            if (!timeout[index] && this.index < index) {
                var data = this.option.queue[index];
                this.option.queue[index] = void 0;
                states[index] = ['cancel', data];
                this.option.stateChange('cancel', data, index, void 0, void 0);
            }
            return this
        },
        exec: function () {
            var that = this;
            var option = that.option;
            var index = that.index;
            var data = option.queue[that.index];
            if (data) {
                that.active++;
                option.stateChange('start', data, index, void 0, void 0);
                if (typeof option.task === 'function') {
                    option.task(
                        data, 
                        function(res) {
							// 超时时, 忽略
							if (timeout[index] !== true && !states[index]) {
								timeout[index] = false
								states[index] = ['success', data, void 0, res];
								option.stateChange('success', data, index, void 0, res)
								that.next(data, that.index);
							}
						},
						function(err, res) {
							if (timeout[index] !== true && !states[index]) {
								timeout[index] = false
								states[index] = ['error', data, err, res];
								option.stateChange('error', data, index, err, res);
								that.next(data, that.index);
							}
						}
                    );
                    if (typeof option.timeout === 'number' && option.timeout > 0) {
                        setTimeout(function() {
                            if (timeout[index] !== false) {
                                timeout[index] = true;
                                states[index] = ['timeout', data];
                                option.stateChange('timeout', data, index, void 0, void 0);
                                that.next(data, that.index);
                            }
                        }, option.timeout);
                    }
                } else {
                    that.next(data, that.index);
                }
            } else {
                that.active++;
                that.next(void 0, that.index);
            }

            if (that.index < that.length - 1 && that.active < that.max) {
                that.index++;
                that.exec()
            }
            return that
        },
        next: function(data, index) {
            var that = this;
            var option = that.option;
            that.active--;
            that.complete++;
            data !== void 0 && option.stateChange('end', data, index, states[2], states[3]);
            if (that.index < that.length - 1) {
                that.index++;
                that.exec();
            }
            if (that.complete > that.length - 1) {
                typeof option.done === 'function' && option.done(states);
            }
            return that
        }
    }).exec();
}