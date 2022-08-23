import { TweetDto } from "../modules/ports/driver/tweet.dto";
import { TweetosDto } from "../modules/ports/driver/tweetos.dtos";
import { Comment } from "./comment";



export class Tweet {

    _id: string; 
    content: string;  
    tweetos: TweetosDto;  
    likes: number;  

    constructor( _id: string,  content: string,   tweetos: TweetosDto,  likes: number){
        this._id = _id;
        this.content = content;
        this.likes = likes;
        this.tweetos = tweetos
        if(this.content.length < 3 || this.content.length > 255) throw new Error("invalid tweet");
        if(this.likes < 0) throw new Error("negative number of likes");
    }

    public getTweetDto(): TweetDto {
        return {
            _id: this._id,
            content: this.content,  
            tweetos: this.tweetos,  
            likes: this.likes,  
        }
    }
}