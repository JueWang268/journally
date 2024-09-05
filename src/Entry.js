//Entry.js

export default class Entry{
    constructor(id, title, date, content, data=null, renamingItem=false, deletingItem=false){
        this.id = id
        this.title = title
        this.dateHistory = [date]
        this.content = content
        this.data = data
        this.renamingItem = renamingItem
    }

    get dateCreated() {
      return this.dateHistory[0]
    }

    get dateModified() {
      return this.dateHistory[this.dateHistory.length - 1]
    }
}