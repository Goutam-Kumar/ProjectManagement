import InStoreReportExpandItem from './InStoreReportExpandItem';

export default class InStoreReportItem {
    constructor(){
        this.isExpanded=false;
        this.instore_report_id = 0;
        this.outlate_name = '';
        this.date = '';
        this.project_id = 0;
        this.InStoreReportExpandItem = [];
    }

    get key(){
        return JSON.stringify(this.instore_report_id);
    }
    
}