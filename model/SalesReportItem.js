import SalesReportExpandItem from './SalesReportExpandItem';

export default class SalesReportItem {
    constructor(){
        this.isExpanded=false;
        this.sales_report_id = 0;
        this.name_retailer = '';
        this.date = '';
        this.project_id = 0;
        this.SalesReportExpandItem = [];
    }

    get key(){
        return JSON.stringify(this.sales_report_id);
    }
    
}