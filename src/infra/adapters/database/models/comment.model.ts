import { Entity, Column, ObjectIdColumn } from "typeorm"
import { TweetosModel } from "./tweetos.model";

@Entity()
export class CommentModel {

    @Column()
    tweetos: TweetosModel;
    @Column()
    content: string;


    constructor(content: string, tweetos: TweetosModel){
        this.content = content;
        this.tweetos = tweetos;
    }
}