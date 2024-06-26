//Entry.js

export default class Entry{
    constructor(id, title, date, content, data=null){
        this.id = id
        this.title = title
        this.date = date
        this.content = content
        this.data = data
    }

    getDate() {
      return this.date.toDateString()
    }
}