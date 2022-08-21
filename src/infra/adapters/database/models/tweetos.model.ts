import { Entity, Column, PrimaryColumn, ObjectIdColumn } from "typeorm"



@Entity()
export class TweetosModel {

    @Column()
    email: string; 
    @Column()
    username: string;  
    @Column()
    avatar: string; 
    @Column()
    followers: string[];
    @ObjectIdColumn({generated: false})
    _id: string

    constructor(id: string, email: string, username: string, avatar: string, followers: string[]){
        this.followers = followers;
        this._id = id;
        this.email = email;
        this.avatar = avatar;
        this.username = username;
    }
}