export interface ICreateTweetRequestDto {
    content: string;
    tweetosId: string;
}

export class CreateTweetRequestDto {
    content: string;
    tweetosId: string;

    constructor(data: ICreateTweetRequestDto){
        try {
            this.content = data.content;
            this.tweetosId = data.tweetosId;
        } catch (error) {
            throw new Error("invalid CreateTweetRequestDto");
        }
    }
}

export interface ICreateTweetosRequestDto {
    email: string; 
    username: string;  
    avatar: string; 
}

export class CreateTweetosRequestDto {

    email: string; 
    username: string;  
    avatar: string; 

    constructor(data: ICreateTweetosRequestDto){
        try {
            this.avatar = data.avatar;
            this.email = data.email
            this.username = data.username;
        } catch (error) {
            throw new Error("Invalid CreateTweetosRequestDto");
        }
    }

}

export class LikeTweetRequestDto {
    tweetId: string;
    constructor(tweetId: string){
        this.tweetId = tweetId;
        if(tweetId.length < 32) throw new Error("invalid tweet id");
    }
}