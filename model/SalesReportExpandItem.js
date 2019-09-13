export default class SalesReportExpandItem {
    constructor(){
        this.sales_report_item_id = 0;
        this.item_id = 0;
        this.item_name = '';
        this.ctn = 0;
        this.unit = 0;
    }

    get key(){
        return JSON.stringify(this.sales_report_item_id);
    }
    
}