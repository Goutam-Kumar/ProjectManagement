export default class SalesItem {
    constructor(){
        this.it_id = 0;
        this.ctnNumber = 0;
        this.unitNumber = 0;
    }

    get key(){
        return JSON.stringify(this.it_id);
    }
    
}