
import { Entity, Column, ObjectIdColumn } from "typeorm"
import { TweetosModel } from "./tweetos.model";
import { CommentModel } from './comment.model'



@Entity()
export class TweetModel {

    @ObjectIdColumn({generated: false})
    public _id: string;
    @Column()
    public content: string; 
    @Column()
    public tweetos: TweetosModel; 
    @Column()
    public likes: number; 
    @Column()
    public comments: CommentModel[];

    constructor(id: string, content: string, tweetos: TweetosModel, likes: number, comments: CommentModel[]){
        this.comments = comments;
        this._id = id;
        this.content = content;
        this.likes = likes;
        this.tweetos = tweetos
    }
}