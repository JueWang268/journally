//Journal.js

class Journal {
    constructor(id, title, date, entries, favorite = false) {
      this.id = id;
      this.title = title;
      this.date = date;
      this.entries = entries;
      this.favorite = favorite;
    }
  
    toggleFavorite() {
        this.favorite = !this.favorite;
    }
}
  
export default Journal;