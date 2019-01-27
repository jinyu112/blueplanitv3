class GeneralExperience {
    
    constructor(idNum,title,startLocationLatLong,cost) {
        // must have properties
        this.id = 'genexp' + idNum;
        this.title = title;
        this.startLocation = startLocationLatLong;
        this.cost = cost;

        //optional properties
        this.website = '';
        this.description = '';
        this.categories = [];
        this.origin = '';
        this.type = '';
    }    
}

class ChildExperience extends GeneralExperience {
    constructor(idNum,title,startLocationLatLong,cost,childIdNum) {
        super(idNum,title,startLocationLatLong,cost);
        this.childId = 'childId'+ childIdNum;
    }
}
export {GeneralExperience,ChildExperience};