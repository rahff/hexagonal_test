export interface TweetosDto {
    _id: string;  
    email: string;  
    username: string;   
    avatar: string;  
    followers: string[];
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