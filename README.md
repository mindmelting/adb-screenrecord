# adb-screenrecord

## Pre-requisites
Android Debug Bridge - http://developer.android.com/tools/help/adb.html  
USB Debugging mode has to be enabled on all devices

## Instructions

```javascript
node adb-record.js record
```
Records screens of all connected devices. To stop recording kill the node process ```CTRL-C```

```javascript
node adb-record.js pull
```
Pulls down video files from connected devices to the current directory
