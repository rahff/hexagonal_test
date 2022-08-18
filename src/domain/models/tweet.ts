import { Tweetos } from "./tweetos";
import { Comment } from "./comment";

export class Tweet {

    constructor(private id: string, private content: string,  private tweetos: Tweetos, private likes: number, private comments: Comment[]){
        if(this.content.length < 3 || this.content.length > 255) throw new Error("invalid tweet");
        if(this.likes < 0) throw new Error("negative number of likes");
    }

    public getContent(): string {
        return this.content;
    }

    public getTweetos(): Tweetos {
        return this.tweetos;
    }

    public getId(): string {
        return this.id;
    }

    public getLikes(): number {
        return this.likes;
    }

    public getComment(): Comment[] {
        return this.comments;
    }
}