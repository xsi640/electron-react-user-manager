const {ipcMain} = require('electron')
const IPCMESSAGE = require('../constipcmessage')
const Storage = require('./storage')

function regIPCMessage() {

    _regIPCHandler(IPCMESSAGE.GET_ALL, (event, args) => {
        return Storage.getAll();
    })

    _regIPCHandler(IPCMESSAGE.SAVE, (event, args) => {
        Storage.insertOrUpdate(args);
        Storage.save();
        return args;
    })

    _regIPCHandler(IPCMESSAGE.DELETE, (event, args) => {
        Storage.delete(args);
        Storage.save();
        return null;
    })

    function _regIPCHandler(message, func) {
        ipcMain.on(message, (event, args) => {
            log.info(`receive msg:${message} args:${JSON.stringify(args)}`);
            let result = {};
            try {
                result.data = func(event, args, (result) => {
                    event.sender.send(message, {data: result});
                });
                if (typeof result.data === 'undefined')
                    return;
            } catch (e) {
                log.error(`error:${e}`)
                result.error = e.message;
            }
            log.info(`send msg:${message} result:${JSON.stringify(result)}`);
            event.sender.send(message, result);
        });
    }
}

module.exports = regIPCMessage