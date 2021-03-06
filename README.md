# Loggers.js

Logger best with [firebug-lite](https://getfirebug.com/firebuglite)

#### Feature list:

 * Grouped log
 * Filtering mesages by key
 * Create/Get/Remove logger
 * Enable/Disable logger
 * Store logs
 * Setup log info template
 * No dependencies

## Tested on

 * IE 10
 * Opera 12
 * Firefox 22
 * Chrome 27


##  API Reference

### **loggers.create(name, options)**
Create new logger object.

* **name** - (String) 
* **oprions** - (Object) OPTIONAL

```javascript
var l = loggers.create('Name');
```
Or with options (for change default options use **loggers.options**)
```javascript
var l = loggers.create('Name', {
    enabled: true,
    enabledLevels: ['log', 'info', 'warn', 'error', 'group', 'groupCollapsed', 'groupEnd'],
    store: true,
    filters: [],
    showLogInfo: true,
    logInfoTemplate: '{time} [{name}] {key}',
    timeTemplate: '{hours}:{minutes}:{seconds}.{milliseconds}'
});
```

### **loggers.get(name)**
Get logger object.

* **name** - (String) 

```javascript
var l = loggers.get('Name');
```

For change options use
```javascript
l.options = {
    enabled: true,
    enabledLevels: ['log', 'info', 'warn', 'error', 'group', 'groupCollapsed', 'groupEnd'],
    store: true,
    filters: new Array(),
    showLogInfo: true,
    logInfoTemplate: '{time} [{name}] {key}',
    timeTemplate: '{hours}:{minutes}:{seconds}.{milliseconds}'
};
```


### **loggers.remove(name)**
Remove logger from list.

* **name** - (String) 

```javascript
loggers.remove('Name');
```

### **loggers.getList()**
Get logger list

```javascript
loggers.getList();
```

### **l.log(key)(arguments)**
### **l.info(key)(arguments)**
### **l.warn(key)(arguments)**
### **l.error(key)(arguments)**
Log function

* **key** - (String) OPTIONAL: key need for log filtering
* **arguments** - (Params) log arguments

```javascript
l.log()('Message');
```
Or more advanced
```javascript
l.log('Key1')('Message', 1, 2, 3);
```

### **l.startGroup(key, collapsed)(arguments)**

Start grouped log

* **key** - (String) OPTIONAL: key need for log filtering
* **collapsed** - (Boolean) OPTIONAL: group is collapsed
* **arguments** - (Params) log arguments

```javascript
l.startGroup()('Message');
```
Or more advanced
```javascript
l.startGroup('Key', true)('Message', 1, 2, 3);
```

### **l.endGroup(key)()**

End gouped log

* **key** - (String) OPTIONAL: key need for log filtering

```javascript
l.endGroup()();
```
Or more advanced
```javascript
l.endGroup('Key')();
```
##License
Licensed under the MIT license.
