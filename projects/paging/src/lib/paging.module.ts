import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagingComponent } from './paging.component';

@NgModule({
    declarations: [PagingComponent],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [PagingComponent]
})
export class PagingNotekModule { }


