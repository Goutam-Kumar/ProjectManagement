export default class InStoreReportExpandItem {
    constructor(){
        this.instore_report_item_id = 0;
        this.item_id = 0;
        this.item_name = '';
        this.perf = 0;
        this.roll = 0;
    }

    get key(){
        return JSON.stringify(this.instore_report_item_id);
    }
    
}