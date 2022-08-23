import { TweetosInMemory } from "../../../src/infra/adapters/services/tweetos-inMemory";
import { TweetInMemory } from "../../../src/infra/adapters/services/tweet-inMemory"
import { FakeTweetos } from "./data";
import { ObjectId } from "mongodb";

describe('InMemory repositories', ()=>{

    beforeAll(()=> console.log("InMemory repositories\n"));

    let tweetInMemory: TweetInMemory = new TweetInMemory(); 
    let tweetosInMemory: TweetosInMemory = new TweetosInMemory();

    describe("\nfindOne method", ()=>{

        beforeAll(()=> console.log("findOne method"));

        it('should find one entity by his id', async ()=>{
            const tweetEntity = await tweetInMemory.findOne({_id: "045042303211111111111111"});
            expect(tweetEntity?.content).toBe("Hello MichMich !");
            const tweetosEntity = await tweetosInMemory.findOne({_id: "123456789111111111111111"});
            expect(tweetosEntity?.username).toBe("Elon Musk");
        });

        it('should find one entity by any filter key', async ()=>{
            const tweetEntity = await tweetInMemory.findOne({content: "Hello MichMich !"});
            expect(tweetEntity?._id).toBe("045042303211111111111111");
            const tweetosEntity = await tweetosInMemory.findOne({email: "elonMusk@gmail.com"});
            expect(tweetosEntity?.username).toBe("Elon Musk");
        })

        it('should find one entity by any nested filter key', async ()=>{
            const tweetEntity = await tweetInMemory.findOne({"tweetos._id": "123456789111111111111111"});
            expect(tweetEntity?.content).toBe("Hello MichMich !");
            const tweetEntity2 = await tweetInMemory.findOne({"tweetos.email": "guygeorges@gmail.com"});
            expect(tweetEntity2?.content).toBe("Hello Jacky !");
        })
    })

    describe('InsertOne Method', ()=>{

        beforeAll(()=> console.log("\ninsertOne method"));

        it('should insert a new Tweet entity', async()=>{
            const saveResult = await tweetInMemory.insertOne({content: 'new Tweet de la muerte', likes: 1, tweetos: FakeTweetos, _id: "newTweet_iddelamuerte"});
            expect(saveResult.insertedId).toBe("newTweet_iddelamuerte");
            const savedTweet = await tweetInMemory.findOne({_id: saveResult.insertedId});
            expect(savedTweet?.content).toBe('new Tweet de la muerte')
        })

        it('should insert a new Tweetos entity', async()=>{
            const saveResult = await tweetosInMemory.insertOne({avatar: "", email: "tweetosJunior@gmail.com", followers: [], username: "Junior Vega", _id: "juniorvega_idnew"});
            expect(saveResult.insertedId).toBe("juniorvega_idnew");
            const savedTweetos = await tweetosInMemory.findOne({_id: saveResult.insertedId});
            expect(savedTweetos?.username).toBe("Junior Vega")
        })
    })

    describe('UpdateOne method', ()=> {
        beforeAll(()=> console.log("\nupdateOne method"))
        it('should update a Tweet entity', async()=>{
            const updateResult = await tweetInMemory.updateOne({_id: "045042303211111111111111"}, {content: 'Tweet de la muerte'});
            const updatedTweet = await tweetInMemory.findOne({_id: "045042303211111111111111"});
            expect(updatedTweet?.content).toBe('Tweet de la muerte');
        })

        it('should update a Tweetos entity', async()=>{
            const updateResult = await tweetosInMemory.updateOne({_id: "123456789111111111111111"}, {email: 'newupadtedemail@gmail.com'});
            const updatedTweetos = await tweetosInMemory.findOne({_id: "123456789111111111111111"});
            expect(updatedTweetos?.email).toBe('newupadtedemail@gmail.com');
        })
    })

    describe('DeleteOne method', ()=> {
        it('should delete a Tweet entity', async()=>{
            const deleteResult = await tweetInMemory.deleteOne({_id: "045042303211111111111111"});
            const deletedTweet = await tweetInMemory.findOne({_id: "045042303211111111111111"});
            expect(deletedTweet).toBeNull();
        })

        it('should delete a Tweetos entity', async()=>{
            const deleteResult = await tweetosInMemory.deleteOne({_id: "123456789111111111111111"});
            const deletedTweetos = await tweetosInMemory.findOne({_id: "123456789111111111111111"});
            expect(deletedTweetos).toBeNull();
        })
    })
})