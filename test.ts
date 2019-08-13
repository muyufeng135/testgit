import promise from 'bluebird'
export default interface Request {
    RequestCode?: string,
    RequestCount: number,
    RequestUser?: string,
    createElement(tagName: string): HTMLElement
}
export class GetTableData {
    PageNumner: number;
    PageSize: number;
    SortName?: string;
    Sort: string;
    constructor(pageNumber: number, pageSize: number, sortName: string, sort: string) {
        this.PageNumner = pageNumber;
        this.PageSize = pageSize;
        this.SortName = sortName;
        this.Sort = sort;
    }
    GetData(): promise<any> {
        return new promise((resolve, reject) => {
            this.PageSize += 10;
            this.PageNumner += 5;
            this.SortName = "modified";
            this.Sort = "desc";
            resolve(this);
        });
    }
}
export class TestEmplement implements Request {
    RequestCount: number = 0;
    createElement(tagName: "div"): HTMLElement {
        return document.createElement('div');
    }
}