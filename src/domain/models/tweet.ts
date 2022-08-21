import { Tweetos } from "./tweetos";
import { Comment } from "./comment";

export class Tweet {

    constructor(public _id: string, public content: string,  public tweetos: Tweetos, public likes: number, public comments: Comment[]){
        if(this.content.length < 3 || this.content.length > 255) throw new Error("invalid tweet");
        if(this.likes < 0) throw new Error("negative number of likes");
    }
}