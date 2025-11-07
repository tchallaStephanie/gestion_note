export default class Repository {
    constructor() {
        if (new.target==Repository) {
            throw new Error("Cette classe ne peut pas etre instancier"); 
        }
        //console.log(new.target);
        
    }

    save(student){};

    delete(id){};

    find(id){};

    findAll(){};
    update(id,student){};
}