const fs = require('fs/promises')

module.exports = class BaseModel {

    constructor(filePath) {
        this._filePath = filePath
        this.entries = require(filePath)
        const lastEntry = this.entries[this.entries.length - 1]
        this.lastEntryId = lastEntry ? lastEntry.id : 0
    }

    insert(entry){
        const newEntry = { ...entry, id: this.lastEntryId + 1 }
        const newEntries = [...this.entries, newEntry]
        return fs.writeFile(this._filePath, JSON.stringify(newEntries))
            .then(() => this.entries = newEntries)
    }

    getAll(){
        return Promise.resolve(this.entries)
    }

    findOneById(id){
        return Promise.resolve(this.entries.find(x => x.id == id))
    }

    search(fn) {
        return Promise.resolve(this.entries.filter(fn))
    }

}