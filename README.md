# IndexedDB + Dexie
Architecture testing app for utilizing IndexedDB with Dexie. Though IndexedDB (web api that enabled indexed objects to be stored in a user's browser) sounds like the perfect solution, 
there's a lot of boilerplate code that's required for making basic inquiries. By using Dexie lib, able to streamline queries. If there's any lang to enable managing a complex API like this... it's TypeScript. Aka defined structure / models 
in the `reading-list.idb.model.ts` file.

Test it or fork it on [Stackblitz](https://stackblitz.com/edit/angular-ivy-agkmc4?file=src/app/models/reading-list-idb.model.ts)

MOCK SERVICE: https://github.com/riapacheco/indexedDB_dexie/blob/main/src/app/services/mock-service.md
## UX Brief
* Create a reading list and manage those reading lists
* Add reading list items to those reading lists
* Add a reading list = new form appears to manage list items for that list

## Translating to IndexedDB
* Reading list is an object store defined/created in the `reading-list-idb.model.ts` file
* A list item is an object stored to those lists

## Translating from Dexie
* No longer need to "open" a new db every time, since Dexie handles this
* Removes long queries [ e.g. in indexedDB, you have to essentially update at the top-level in order to access the methods for lower level operations on the lists, and remember things like accepting the returned db object that you refer to recursively during operations ]
