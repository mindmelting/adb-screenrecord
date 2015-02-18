# adb-screenrecord

## Pre-requisites
Android Debug Bridge - http://developer.android.com/tools/help/adb.html  
USB Debugging mode has to be enabled on all devices

## Installation
```javascript
npm install -g adb-screenrecord
```

## Instructions

```javascript
adb-screenrecord record
```
Records screens of all connected devices. To stop recording kill the node process ```CTRL-C```

```javascript
adb-screenrecord pull
```
Pulls down video files from connected devices to the current directory
