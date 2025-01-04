//Journal.js

class Journal {
  constructor(id, title, date, entries, favorite = false, user_id) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.user_id = user_id
    this.entries = entries;
    this.favorite = favorite;
  }

  // toggleFavorite() {
  //     this.favorite = !this.favorite;
  // }
}

export default Journal