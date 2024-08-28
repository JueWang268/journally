//Entry.js

export default class Entry{
    constructor(id, title, date, content, data=null, renamingItem=false, deletingItem=false){
        this.id = id
        this.title = title
        this.date = date
        this.content = content
        this.data = data
        this.renamingItem = renamingItem
        this.deletingItem = deletingItem
    }

    getDate() {
      return this.date.toDateString()
    }
}