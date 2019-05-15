import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    title = 'ng-paging-notek';
    total: number = 121;

    clickPage(page: number) {
        console.log(page);
    };
}
