
import { CommentTweetosFeature } from "../../../src/infra/injectors/comment-tweet-feature";
import { CommentTweet } from "../../../src/domain/modules/comment-tweet.module";
import { FakeTweet, FakeTweet2, FakeTweetos } from "../../infra/database/data";
import { CommentTweetRequestDto } from "../../../src/domain/modules/ports/driver/comment.dto";



describe('CommentTweetRequest', ()=>{

    beforeAll(()=> console.log("\nCommentTweetRequest"));
    
    let commentTweet: CommentTweet;

    beforeEach(()=>{
        commentTweet = CommentTweetosFeature();
    })
    it('should throw an error if the tweetos does not exist', async ()=>{
        try {
            const commentRequestDto: CommentTweetRequestDto = { tweetRefId: "045042303211111111111111", tweetosId: "hfujhrfnotexist", content: "Hello" };
            const result = await commentTweet.execute(commentRequestDto);
            expect(result).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe('tweetos does not exist');
        }
    })

    it('should throw an error if the tweet does not exist', async ()=>{
        try {
            const commentRequestDto: CommentTweetRequestDto = { tweetRefId: "pahfhjked558rnotexist", tweetosId: "123456789111111111111111", content: "Cool !"};
            const result = await commentTweet.execute(commentRequestDto);
            expect(result).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe('this tweet does not exist');
        }
    })

    it('should add a comment for a a tweet', async ()=>{
        const commentRequestDto: CommentTweetRequestDto = { tweetRefId: "045042303211111111111111", tweetosId: "123456789111111111111111", content: "Cool !"};
        const comment = await commentTweet.execute(commentRequestDto);
        expect(comment.content).toBe("Cool !");
        expect(comment.tweetRefId).toEqual("045042303211111111111111");
    })

})