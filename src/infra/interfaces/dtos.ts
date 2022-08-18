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