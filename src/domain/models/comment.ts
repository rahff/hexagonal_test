import { Tweetos } from "./tweetos";

export class Comment {

    constructor(public tweetos: Tweetos, public content: string){
        if(this.content.length < 1) throw new Error("the comment is empty");
        
    }
}