### ng-paging-notek angular6+ 分页组件

##### 安装
`npm install ng-paging-notek -D`

##### 使用
```
// app.module.ts
import { PagingNotekModule } from 'ng-paging-notek';
@NgModule({
    declarations: [...],
    imports: [
        PagingNotekModule
    ],
    providers: [...],
    bootstrap: [...]
})

// component.
export class YourComponent {
    limit: number = 10;
    total: number = 122;

    getCurrentPageNum(page: number) {
        console.log(page);
    };
}

// component of view.
<ng-paging-notek 
  [pageLimit]="limit" 
  [pageTotal]="total" 
  (currentPageChange)="getCurrentPageNum($event)"></ng-paging-notek>

```

##### 参数列表
```
**类型**
混合类型: dialog.create(params)
提示类型: dialog.alert('标题', params)
用户交互类型: dialog.prompt('标题', params)

**参数**
theme: string --> 皮肤，可选项：sky-blue(默认)、light-yellow、jade-green
pageLimit: number --> 分页大小
pageTotal: number --> 数据总数
currentPage: number --> 设置默认起始页码
prevText: string --> 上一页文本，默认「上一页」
nextText: string --> 下一页文本，默认「下一页」
firstText: string --> 首页文本，默认「首页」
lastText: string --> 末页文本，默认「末页」
ellipseText: string --> 省略部分文本，默认「...」
isDisplayFirstBtn: boolean --> 是否显示首页按钮，默认true
isDisplayLastBtn: boolean --> 是否显示末页按钮，默认true
isDisplayHelper: boolean --> 是否显示辅助功能，默认true
```












