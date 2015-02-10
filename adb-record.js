var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();
var colors = require('colors');
var fs = require('fs');

function record() {
    console.log('Terminate this node process to stop recording'.bold.red);

    client.listDevices().then(function(devices) {
        var numDevices = 1;
        return Promise.map(devices, function(device) {
            return client.getProperties(device.id).then(function(props) {
                return {
                    device: device,
                    deviceName: props['ro.product.model']
                };
            });
        });
    }).then(function(devicesData) {
        devicesData.forEach(function(deviceData, index) {
            console.log(deviceData.deviceName);
            client.shell(deviceData.device.id, 'screenrecord /sdcard/Movies/' + deviceData.device.id + '.mp4');
        });
    }); 
}

function pull() {
    client.listDevices().then(function(devices) {
        return Promise.map(devices, function(device) {
            return client.pull(device.id, '/sdcard/Movies/' + device.id + '.mp4').then(function(transfer) {
                return new Promise(function(resolve, reject) {
                    var fn = device.id + '.mp4';

                    transfer.on('progress', function(stats) {
                      console.log('[%s] Pulled %d bytes so far',
                        device.id,
                        stats.bytesTransferred);
                    });
                    transfer.on('end', function() {
                      console.log('[%s] Pull complete', device.id);
                      resolve(device.id);
                    });
                    transfer.on('error', reject);
                    transfer.pipe(fs.createWriteStream(fn));
                });
            }) ;
        });
    }).then(function() {
        console.log('Completed'.green.bold);
    });
}

function checkArguments() {
    if (process.argv.length < 3) {
        displayHelp();
    } else {
        switch(process.argv[2]) {
            case 'record':
                record();
                break;
            case 'pull':
                pull();
                break;
            default:
                displayHelp();
        }
    }
}

function displayHelp() {
    console.log('Commands available');
    console.log('-------------------'.rainbow.bold);
    console.log('record'.bold + ' - Record video');
    console.log('pull'.bold + ' - Pull video');
    process.exit(1);
}

checkArguments();
