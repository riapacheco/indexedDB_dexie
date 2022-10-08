import { Component, Input, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, IReadingList } from '../../models/reading-list-idb.model';

/**
 * Viewing a single reading list and adding new items to it
 * FUTURE TASK: associate to route
 */

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {
  // What can get imported to list
  @Input() readingList!: IReadingList;
  // Calls liveQuery for observing aka using that async pipe
  readingListItems$ = liveQuery(() => this.listReadingListItems());
  // something to bind to from template and manipulated here
  book = {
    title: '',
    author: ''
  }
  
  constructor() { }

  ngOnInit() {
  }


  // CALLED BY LIVEQUERY
  async listReadingListItems() {
    return await db.readingItems
      .where({
        readingListId: this.readingList.id
      })
      .toArray();
  }

  // ADD AN ITEM TO THE LIST - SUBMIT BUTTON
  async addReadingItem() {
    await db.readingItems.add({
      title: this.book.title,
      author: this.book.author,
      readingListId: this.readingList.id
    })
    this.book = { title: '', author: '' };
  }

  // DELETE READING LIST ITEM
  async deleteReadingListItem(itemId: number) {
    await db.readingItems.where('id').equals(itemId).delete();
  }
}