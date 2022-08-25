import { CommentTweet } from "../../../src/core/features/comment-tweet.feature";
import { CommentTweetRequestDto } from "../../../src/core/ports/driver/comment.dto";
import { DBMongo } from "../../../src/infra/database";
import { mongoUrl, tweetIdRef, tweetosIdRef } from "../../infra/database/data";
import { CommentTweetModule } from "../../../src/app/modules/commentTweet.module";
import { CommentRepository } from "../../../src/infra/adapters/repositories/comment-repository";



describe('CommentTweetRequest', ()=> {

    const db = new DBMongo(mongoUrl, "tweet");
    let commentTweet: CommentTweet;
    let commentRepository: CommentRepository;
    beforeAll( async ()=> {
        console.log("\nCommentTweetRequest");
        await db.start();
        commentTweet = CommentTweetModule.forTesting();
        commentRepository = new CommentRepository(db.getCommentCollection());
    });
    

    it('should throw an error if the tweetos does not exist', async ()=>{
        try {
            const commentRequestDto: CommentTweetRequestDto = { 
                tweetRefId: tweetIdRef, tweetosId: "hfujhrfnotexist", content: "Hello" 
            };
            const result = await commentTweet.execute(commentRequestDto);
            expect(result).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe('tweetos does not exist');
        }
    })

    it('should throw an error if the tweet does not exist', async ()=>{
        try {
            const commentRequestDto: CommentTweetRequestDto = { 
                tweetRefId: "pahfhjked558rnotexist", tweetosId: tweetosIdRef, content: "Cool !"
            };
            const result = await commentTweet.execute(commentRequestDto);
            expect(result).toBeNull();
        } catch (error: any) {
            expect(error.message).toBe('this tweet does not exist');
        }
    })

    it('should add a comment for a a tweet', async ()=>{
        const commentRequestDto: CommentTweetRequestDto = { tweetRefId: tweetIdRef, tweetosId: tweetosIdRef, content: "Cool !"};
        const comment = await commentTweet.execute(commentRequestDto);
        const expectedComment = await commentRepository.findOne({_id: comment._id})
        expect(expectedComment?.content).toBe("Cool !");
        expect(expectedComment?.tweetRefId).toEqual(tweetIdRef);
    })

    afterAll(async ()=> {
        await db.destroy();
        console.log("\nclient closed");
    });

})