export default class InStoreItem {
    constructor(){
        this.it_id = 0;
        this.prefAmnt = 0;
        this.rollAmnt = 0;
        this.totalUnit = 0;
    }

    get key(){
        return JSON.stringify(this.it_id);
    }
    
}