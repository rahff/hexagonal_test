import { Tweetos } from "./tweetos";

export class Comment {

    constructor(private tweetos: Tweetos, private content: string){
        if(this.content.length < 1) throw new Error("the comment is empty");
        
    }

    public getTweetos(): Tweetos {
        return this.tweetos;
    }

    public getContent(): string {
        return this.content;
    }
}