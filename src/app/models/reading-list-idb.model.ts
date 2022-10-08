/**
 * This model defines the name of the Object Stores for this Reading List and the structure of what objects are stored.
 * Created an dexie.constants.ts file to enable re-usability among multiple models and create more plain-english friendly code.
 */

import Dexie, { Table } from "dexie";
import { DEXIE } from "../constants/dexie.constants";

// TABLES = OBJECT STORES
// Significant workflow req - define the tables in client
export interface IReadingList {
  id?: number;
  title: string;
}

// OBJECTS ACTUALLY STORED
export interface IReadingListItem {
  id?: number;
  readingListId?: number;
  title: string;
  author?: string;
  readingComplete?: boolean;
}

export class ReadingListIDB extends Dexie {
  // lists the item AND a number type foor IDs
  readingItems!: Table<IReadingListItem, number>;
  readingLists!: Table<IReadingList, number>;

  constructor() {
    super(DEXIE.EXTENDED_CLASS);

    /** 
     * A) DEFINE VERSIONS AND HOW THEY DIFFER IN STRUCTURE
     * B) AUTO_INCREMENT '++id', APPLIED TO IDS
     * C) "DESTRUCTURES" AKA IDENTIFIES WHAT WILL BE QUERIED SINCE INDEXEDDB REQS THIS AKA CURSORS
     */
    this.version(1).stores({
      readingLists: DEXIE.AUTO_INCREMENT_ID,
      readingItems: DEXIE.AUTO_INCREMENT_ID + ', readingListId', // IReadingListItem [[ '++id, readingListId' ]]
    });
    // ENABLES PRE-POPULATING SO THAT THE DB CAN INITIALIZE / EXIST
    this.on('populate', () => this.onSeeder());
  }

  async onSeeder() {
    // 1 - DEFINES OBJECT STORE AKA "TABLE" WITH A TITLE - ID RETURNS BECAUSE OF CONSTRUCTOR
    const readingListId = await db.readingLists.add({
      title: 'That innovation book recommended on Twitter... I forget the name lololol'
    });

    // 2 - BULK ADDS OBJECTS TO THE STORE && COULD PASS IN AN ARRAY (FOR A FUTURE SERVICE)
    await db.readingItems.bulkAdd([
      {
        readingListId,
        title: 'Extraordinary Minds',
        author: 'Howard Gardner'
      },
      {
        readingListId,
        title: 'The Third Wave',
        author: 'Alvin Toffler'
      }
    ])
  }


  // 3 - RESET ALL DATABASES
  async resetDatabase() {
    // unsure why this won't accept my enums
    // rw = readwrite (required by the core IndexedDB API)
    await db.transaction('rw', 'readingItems', 'readingLists', () => {
      this.readingItems.clear();
      this.readingLists.clear();
    })    
  }


  // 4 - DELETE RECORDS/ITEMS -- Very postgres-y
  async deleteReadingItem(itemId: number | undefined) {
    if (itemId !== undefined) {
      await db.readingItems
        .where('id').equals(itemId)
        .delete();
    }
  }

  /**
   * Example from Docs [https://dexie.org/docs/Collection/Collection.delete()] [I adjusted for angular by combing JS with TS]
   * 
   * async deleteSomething() {
   *  let deleteCount = await db.orders
   *    .where("state").anyOf("finished", "discarded")
   *    .or("date").below("2022-02-01")
   *    .delete();
   * }
   */
}

// IMPORT FOR FUTURE SERVICE
export const db = new ReadingListIDB();