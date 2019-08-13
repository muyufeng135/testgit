interface JQuery {
    datetimepicker(method: string): JQuery;
    datetimepicker(opt?: any): JQuery;
    newsTicker(method: string): JQuery;
    newsTicker(opt?: any): JQuery;
    hubConnection(opt?:any):JQuery;
    bootstrapTable(opt?:any):JQuery;
    modal(method: string): void;
    bootstrapTable(method: string, args?: any): JQuery;
}
interface BootstrapTableMethod {
    getOptions(): any;
    getSelections(): any;
    getAllSelections(): any;
    showAllColumns(): void;
    hideAllColumns(): void;
    getData(useCurrentPage: boolean): any;
    getRowByUniqueId(id: any): any;
    load(data: any): void;
    append(data: any): void;
    prepend(data: any): void;
    remove(params: any): void;
    removeAll(): void;
    removeByUniqueId(id: any): void;
    insertRow(params: any): void;
    updateRow(params: any): void;
    updateByUniqueId(params: any): void;
    showRow(params: any): void;
    hideRow(params: any): void;
    getHiddenRows(hidden: boolean): any;
    mergeCells(options: any): void;
    updateCell(params: any): void;
    refresh(params: any): void;
    refreshOptions(options: any): void;
    resetSearch(text: string): void;
    showLoading(): void;
    hideLoading(): void;
    checkAll(): void;
    uncheckAll(): void;
    checkInvert(): void;
    check(index: number): void;
    uncheck(index: number): void;
    checkBy(params: any): void;
    uncheckBy(params: any): void;
    resetView(params: any): void;
    resetWidth(): void;
    destroy(): void;
    showColumn(field: string): void;
    hideColumn(field: string): void;
    getHiddenColumns(): any;
    getVisibleColumns(): any;
    scrollTo(value: any): void;
    getScrollPosition(): number;
    filterBy(params: any): void;
    selectPage(page: number): void;
    prevPage(): void;
    nextPage(): void;
    togglePagination(): void;
    toggleView(): void;
    expandRow(index: number): void;
    collapseRow(index: number): void;
    expandAllRows(issubtable: boolean): void;
    collapseAllRows(issubtable: boolean): void;
    updateCellById(params: any): void;
}
declare function formatterDate(params:any,format:string|null):string;


