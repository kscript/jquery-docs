$.fn.extend({
    fuzzySearch: function(options){
        var instances = [];
        $(this).each(function(){
            options = $.extend({
                event: {},
                // 调用fuzzySearch时, 是否重新初始化
                reInit: false,
                // 缓存数据的到期时间, 毫秒, 为0时不开启缓存
                expire: 0,
                
                // 如果开启缓存, 且匹配到数据, 那么跳过getData, matchData, 直接执行showData(matchResult)
                
                // data相关函数的this为当前的fuzzySearch实例
                // 如果没有给回调函数 done 传递参数, 结束本次流程
                getData: function(done) {},
                matchData: function(inputValue, data){},
                showData: function(matchResult) {}
            }, options);

            var event = options.event = $.extend({
                // input 需要事件委托时的选择器
                proxy: '',
                // 触发事件
                trigger: 'propertychange change input focus',
                // 触发事件时执行的函数 
                // 回调函数 proceed, 表示是否需要继续下一步, 不调用则表示本次流程结束~
                // 触发事件 -> 请求数据 -> 匹配数据 -> 显示数据
                handler: function(event, proceed) {}
            }, options.event);

            var cache = {};
            var cacheTimer = 0;
            var instance = $(this).data('fuzzySearch');
            if (!options.reInit && instance) {
                instances.push(instance);
                return ;
            } else if (instance) {
                delete instance.cache;
                $(this).removeData('fuzzySearch');
                if (event.proxy) {
                    $(this).off(event.trigger, event.proxy, instance.handler);
                } else {
                    $(this).off(event.trigger, instance.handler);
                }
            }
            instance = {
                ev: null,
                data: null,
                value: '',
                cache: cache,
                source: $(this),
                input: $(this),
                handler: function(ev) {
                    if (event.proxy) {
                        instance.input = instance.source.find(event.proxy);
                    }
                    instance.ev = ev;
                    var value = instance.value = instance.input.val();
                    // 只要用户触发事件, 就重启一个清理缓存的定时器, 保证用户不再进行搜索时, 缓存可以被清理
                    if (options.expire > 0) {
                        clearTimeout(cacheTimer);
                        cacheTimer = setTimeout(function() {
                            validCache(cache, options.expire);
                            cacheTimer = 0;
                        }, options.expire + 3e3);
                    }
                    
                    if (typeof event.handler === 'function') {
                        event.handler.call(this, ev, function() {
                            validCache(cache, options.expire);
                            var cacheData = cache[value];
                            if (cacheData) {
                                instance.data = cacheData.data;
                                options.showData.call(instance, cacheData.matchResult);
                            } else {
                                options.getData.call(instance, value, function(data) {
                                    if (options.expire > 0) {
                                        cache[value] = {
                                            time: +new Date,
                                            data: data
                                        }
                                    }
                                    if (arguments.length) {
                                        instance.data = data;
                                        var matchResult = options.matchData.call(instance, value, data);
                                        if (cache[value]) {
                                            cache[value].matchResult = matchResult;
                                        }
                                        options.showData.call(instance, matchResult);
                                    }
                                });
                            }
                        });
                    }
                }
            };
            instances.push(instance);
            $(this).data('fuzzySearch', instance);
            if (event.proxy) {
                $(this).on(event.trigger, event.proxy, instance.handler);
            } else {
                $(this).on(event.trigger, instance.handler);
            }
            function validCache(cache, expire) {
                if (cache instanceof Object) {
                    var time = +new Date;
                    expire = expire || 6e4;
                    for (var key in cache) {
                        if (cache[key].time + expire < time) {
                            delete cache[key];
                        }
                    }
                }
                return cache;
            }
        });
        return instances;
    }
})