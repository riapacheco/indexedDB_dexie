# Mock service
Notes for later implementation

### Enum
Since the title of tables are used for indexing on IndexedDB - these are named permanently
```typescript
  // dexie.enums.ts
  export enum TABLE_TITLE {
    PROJECTS = 'Projects',
    SOMETHING_ELSE = 'Another Table'
  }
```

# Service
> Given that the model looks similar to the one in this live example:

```typescript
import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { TABLE_TITLE } from '../enums/dexie.enums';
import { IProjectItem } from '../interfaces/project.interface';
import { pdb } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectSections$ = liveQuery(() => pdb.projectSections.toArray());
  projectItems$ = liveQuery(() => this.initData());

  constructor() {}

  // LOAD DATA
  async initData() {
    return await pdb.projectItems
        .where({ project_section_id: TABLE_TITLE.PROJECTS })
        .toArray();
  }

  /* ----------------------------------- GET ---------------------------------- */
  // under a different section - needs ID of that section
  async getProject(projectSectionId: number) {
    return await pdb.projectItems
        .where({ project_section_id: projectSectionId })
        .toArray();
  }

  /* --------------------------------- UPDATE --------------------------------- */
  async updateProject(projectId: number, projectData: IProject) {
    await pdb.projectItems.update(projectId, projectData);
  }

  /* --------------------------------- DELETE --------------------------------- */
  async deleteProject(projectId: number) {
    await pdb.projectItems.where('id').equals(projectId).delete();
  }
}

```