import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, IReadingList } from './models/reading-list-idb.model';

/**
 * Example for what might be applied to a service
 * Made easier by `reading-list-idb.model.ts`'s structuring
 */

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  readingLists$ = liveQuery(() => db.readingLists.toArray());
  readingListName = '';

  async addNewListType() {
    await db.readingLists.add({
      title: this.readingListName
    });

    this.resetField();
  }

  async resetDatabases() {
    await db.resetDatabase();
  }

  /**
   * uses angular's TrackBy feature to only track changes made to DB
   * requires this function (see docs): https://angular.io/api/core/TrackByFunction
   */
  readingListTrackBy(index: number, list: IReadingList) {
    return `${list.id}${list.title}`;
  }

  private resetField() {
    this.readingListName = '';
  }
}
