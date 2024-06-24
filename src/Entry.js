//Entry.js

export default class Entry{
    constructor(id, title, date, content){
        this.id = id;
        this.title = title;
        this.date = date;
        this.content = content;
    }

    getDate() {
      return this.date.toDateString()
    }
}