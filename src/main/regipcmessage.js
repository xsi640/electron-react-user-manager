const {ipcMain} = require('electron')
const IPCMESSAGE = require('../constipcmessage')
const Storage = require('./storage')
const log = require('electron-log')

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
        for(let id of args) {
            Storage.delete(id);
        }
        Storage.save();
        return args;
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
            setTimeout(() => {
                event.sender.send(message, result);
            }, 3000)
        });
    }
}

module.exports = regIPCMessage