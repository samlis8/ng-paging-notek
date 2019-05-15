import { Component, OnChanges, Input, EventEmitter, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'ng-paging-notek',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.style.css']
})
export class PagingComponent implements OnChanges {
    @Output() currentPageChange = new EventEmitter();
    // 皮肤.
    @Input() theme: string = 'sky-blue';
    // 分页大小.
    @Input() private pageLimit: number = 10;
    // 数据总数.
    @Input() private pageTotal: number = 0;
    // 默认起始页码.
    @Input() currentPage: number = 1;
    // 上一页文字.
    @Input() prevText: string = '上一页';
    // 下一页文字.
    @Input() nextText: string = '下一页';
    // 首页文字.
    @Input() firstText: string = '首页';
    // 末页文字.
    @Input() lastText: string = '末页';
    // 省略部分的文本.
    @Input() ellipseText: string = '...';
    // 是否显示首页按钮.
    @Input() isDisplayFirstBtn: boolean = true;
    // 是否显示末页按钮.
    @Input() isDisplayLastBtn: boolean = true;
    // 是否显示辅助功能.
    @Input() isDisplayHelper: boolean = true;

    pageNum: number = 0;
    emptyList: any[] = [];
    abbrSymbolSize: number = 10;

    quickJumpPage: string = '';
    quickJumpNumIsCorrect: boolean = true;

    timer: any;

    constructor(private cd: ChangeDetectorRef) { };

    ngOnChanges(changes: SimpleChanges) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if(typeof this.currentPage !== 'number') throw TypeError('currentPage must be a Number.');
            if(typeof this.pageLimit !== 'number') throw TypeError('pageLimit must be a Number.');
            if(typeof this.pageTotal !== 'number') throw TypeError('pageTotal must be a Number.');
            
            this.gotoPage();
        });
    };

    /** 转换页码 **/
    private gotoPage() {
        this.emptyList = [];
        this.pageNum = Math.ceil(this.pageTotal / this.pageLimit);
        if(this.pageNum - this.currentPage > 3) {
            if(this.currentPage >= 5 && this.pageNum > this.abbrSymbolSize) {
                this.emptyList = [1, 'place', this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, 'place', this.pageNum];
            }else {
                // (this.emptyList.indexOf('place') > -1 || this.isInit) && this.initPageParams();
                this.initPageParams();
            }
        }else {
            if(this.currentPage >= 5 && this.pageNum > this.abbrSymbolSize) {
                this.emptyList = [1, 'place', this.pageNum - 4, this.pageNum - 3, this.pageNum - 2, this.pageNum - 1, this.pageNum];
            }

            if(this.pageNum < 5) {
                this.initPageParams();
            }
        } 

        this.currentPageChange.emit(this.currentPage);
    };

    /** 下一页 **/
    nextPage() {
        if(this.currentPage < this.pageNum) this.currentPage++;

        this.gotoPage();      
    };

    /** 上一页 **/
    prevPage() {
        if(this.currentPage > 1) this.currentPage--;

        this.gotoPage();       
    };

    /** 点击页码 **/
    clickPage(current: number) {
        this.currentPage = current;
        
        // 如果点击最后一页, 默认和末页行为一致.
        if(current === this.pageNum) this.lastPage();

        // 如果点击第一页, 默认和首页行为一致.
        if(current === 1) this.firstPage();

        // 点击其他页码.
        current !== this.pageNum && current !== 1 && this.gotoPage();
    };

    /** 首页 **/
    firstPage() {
        this.currentPage = 1;
        this.initPageParams();
        this.currentPageChange.emit(this.currentPage);
    };

    /** 末页 **/
    lastPage() {
        this.currentPage = this.pageNum;
        this.currentPageChange.emit(this.currentPage);
        this.pageNum > this.abbrSymbolSize && (this.emptyList = [1, 'place', this.pageNum - 4, this.pageNum - 3, this.pageNum - 2, this.pageNum - 1, this.pageNum]);
    };

    /** 快速跳转 **/
    quickJump() {
        if(+this.quickJumpPage > this.pageNum || !this.quickJumpPage) {
            this.quickJumpNumIsCorrect = false;
            return;
        }else {
            this.quickJumpNumIsCorrect = true;
        }
        this.currentPage = +this.quickJumpPage;
        this.gotoPage();
    };

    /** 过滤快速跳转页码的违规输入 **/
    filterQuickPage() {
        this.quickJumpPage = this.quickJumpPage.replace(/[^0-9]/g, '');
    };

    /** 初始化 **/
    private initPageParams() {
        // 如果页码小于等于10则全部显示.
        if(this.pageNum <= this.abbrSymbolSize) {
            for(let i=0; i<this.pageNum; i++) this.emptyList.push(i + 1);
        }

        // 如果页码大于10则需要生成缩略符号.
        if(this.pageNum > this.abbrSymbolSize) {
            this.emptyList = [1, 2, 3, 4, 5, 'place', this.pageNum];
        }
    };

}
