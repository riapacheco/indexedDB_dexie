import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CommonModule } from '@angular/common';
import { ReadingListComponent } from './views/reading-list/reading-list.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ReadingListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
