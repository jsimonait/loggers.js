/**
 * Loggers.js
 * @author: jsimonait <jsimonait@gmail.com>
 */

(function (window) {

    var Logger = function (name, options) {
        this.oprions = options;
        var o = this.oprions;

        var logs = [];

        this.log = function (key) {
            return function () {
                if (!o.enabled || o.enabledLevels.indexOf('log') < 0 || !canLog(key)) return;

                writeLog('log', key, arguments);
            };
        };

        this.info = function(key){
            return function () {
                if (!o.enabled || o.enabledLevels.indexOf('info') < 0 || !canLog(key)) return;

                writeLog('info', key, arguments);
            };  
        };

        this.warn = function(key){
            return function () {
                if (!o.enabled || o.enabledLevels.indexOf('warn') < 0 || !canLog(key)) return;

                writeLog('warn', key, arguments);
            };  
        };

        this.error = function(key){
            return function () {
                if (!o.enabled || o.enabledLevels.indexOf('error') < 0 || !canLog(key)) return;

                writeLog('error', key, arguments);
            };  
        };

        this.startGroup = function (key, collapsed) {
            return function () {
                if (!o.enabled || 
                    o.enabledLevels.indexOf('group') < 0 || 
                    o.enabledLevels.indexOf('groupCollapsed') < 0 || 
                    !canLog(key)) return;

                var gFunc = 'group';
                if (collapsed != undefined && collapsed == true) {
                    gFunc = 'groupCollapsed';
                }

                writeLog(gFunc, key, arguments);
            };
        };

        this.endGroup = function (key) {
            return function () {
                if (!o.enabled || 
                    o.enabledLevels.indexOf('groupEnd') < 0 ||
                    !console.groupEnd || 
                    !canLog(key)) return;

                console.groupEnd();
            };
        };

        this.getStore = function(){
            return logs;
        };

        this.clearStore = function(){
            logs = [];
        };

        var writeLog = function(level, key, args){
            if(!console[level]) return;

            if(o.showLogInfo){
                var logInfo = getLogInfo(key);
                if (args.length > 0) {
                    console[level](logInfo, args);
                } else {
                    console[level](logInfo);
                }
            }else{
                console[level](args);
            }

            store(level, key, args);
        };

        var store = function(level, key, args){
            if(!o.store) return;

            var log = {
                date: new Date(),
                level: level,
                key: key,
                args: args
            };
            
            logs.push(log);
        };

        var canLog = function (key) {
            if (key == undefined ||  key == null || key == '') return true;
            if (typeof key != 'string') throw new Error("Type of log key must be 'String'");

            var f = o.filters;
            if (f && f instanceof Array && f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    if (key.indexOf(f[i]) > -1) return true;
                }
                return false;
            }
            return true;
        };

        var getLogInfo = function (key) {
            if(key == undefined ||  key == null) key = '';

            var info = o.logInfoTemplate;

            info = info.replace('{time}', getTimeString(o.timeTemplate));
            info = info.replace('{name}', name);
            info = info.replace('{key}', key);

            return info;
        };

        var getTimeString = function (template) {
            var date = new Date();
            var hours = formatInt(date.getHours(), 2);
            var minutes = formatInt(date.getMinutes(), 2);
            var seconds = formatInt(date.getSeconds(), 2);
            var milliseconds = date.getMilliseconds();

            var result = template;
            result = result.replace('{hours}', hours);
            result = result.replace('{minutes}', minutes);
            result = result.replace('{seconds}', seconds);
            result = result.replace('{milliseconds}', milliseconds);
            return result;
        };

        var formatInt = function(num, length) {
            return (num / Math.pow(10, length)).toFixed(length).substr(2);
        };

    };

    window.loggers = new function () {
        var that = this,
            LOGGERS = [];

        this.version = '0.1.0'

        this.options = {
            enabled: true,
            enabledLevels: ['log', 'info', 'warn', 'error', 'group', 'groupCollapsed', 'groupEnd'],
            store: true,
            filters: new Array(),
            showLogInfo: true,
            logInfoTemplate: '{time} [{name}] {key}',
            timeTemplate: '{hours}:{minutes}:{seconds}.{milliseconds}'
        };

        this.create = function(name, options){
            if (name == undefined || name == null || name == '') {
                throw new Error("A Logger must have a name");
            }

            var defaultOpts = clone(this.options);
            options = extend(defaultOpts, options || {});

            LOGGERS[name] = new Logger(name, options);
            return LOGGERS[name];
        };

        this.remove = function(name){ 
            delete LOGGERS[name]; 
        };

        this.get = function (name) {
            return LOGGERS[name]; 
        };

        this.getList = function () { 
            return LOGGERS; 
        };

        this.getStore = function(){
            var list = [];
            for (var name in LOGGERS){
                var store = LOGGERS[name].getStore();
                for (var i in store){
                    store[i]['name'] = name;
                    list.push(store[i]);
                }   
            }
            return list;
        };

        this.clearStore = function () { 
            for (var name in LOGGERS){
                LOGGERS[name].clearStore();   
            } 
        };

        var extend = function (a, b) {
            for (var key in b){
                if(b.hasOwnProperty(key)){
                    a[key] = b[key];
                }
            }
            return a;
        };

        var clone = function (obj) {
            if (null == obj || "object" != typeof obj) return obj;
            
            if (obj instanceof Date) {
                var copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }
            
            if (obj instanceof Array) {
                var copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            if (obj instanceof Object) {
                var copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }
        }
    };

})(window);
