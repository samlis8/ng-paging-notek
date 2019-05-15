import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagingNotekModule } from 'paging';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagingNotekModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
