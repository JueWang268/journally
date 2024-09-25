// import React, { Component } from 'react'

export default class Entry{
    constructor(id, title, date, content, data=null, renamingItem=false, deletingItem=false){
      this.id = id
      this.title = title
      this.dateHistory = [date]
      this.content = content
      this.data = data
      this.renamingItem = renamingItem
    }

}
