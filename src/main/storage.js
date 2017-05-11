const fs = require('fs');
const log = require('electron-log')

class Storage {

    constructor() {
        this._path = 'person.json'
        this._data = [];
        this._id = 0;

        this._read();
    }

    insertOrUpdate(dbInfo) {
        let obj = null;
        if (typeof dbInfo.id === 'number') {
            obj = this.get(dbInfo.id);
        }
        if (obj != null) {
            let index = this._data.indexOf(obj);
            this._data[index] = dbInfo;
        } else {
            this._id++;
            dbInfo.id = this._id;
            this._data.push(dbInfo);
        }
        return dbInfo;
    }

    delete(id) {
        let obj = this.get(id);
        if (typeof obj !== 'undefined') {
            let index = this._data.indexOf(obj);
            if (index >= 0)
                this._data.splice(index, 1);
        }
    }

    get(id) {
        let result = undefined;
        for (let item of this._data) {
            if (item.id === id) {
                result = item;
                break;
            }
        }
        return result;
    }

    getAll() {
        return this._data;
    }

    _read() {
        try {
            let data = JSON.parse(fs.readFileSync(this._path, {encoding: 'utf8'}).toString());
            if (data) {
                for (let item of data) {
                    this._data.push(item);
                    if (this._id < item.id) {
                        this._id = item.id;
                    }
                }
            }
        } catch (err) {
            log.error(err)
        }
    }

    save() {
        let json = JSON.stringify(this._data);
        fs.writeFileSync(this._path, json, {encoding: 'utf8'});
    }
}

module.exports = new Storage();