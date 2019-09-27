

export default class InBarReportItem {
    constructor(){
        this.isExpanded=false;
        this.inber_report_id = 0;
        this.cfa_code = '';
        this.date = '';
        this.project_id = 0;
        this.contact_number = '';
        this.contact_person= '';
        this.amount_sold = 0;
        this.voucher = 0;
        this.free_drinks = 0;
        this.total_insentives = 0;
    }

    get key(){
        return JSON.stringify(this.inber_report_id);
    }
    
}