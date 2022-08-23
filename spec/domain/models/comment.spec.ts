import { Comment } from "../../../src/domain/models/comment"
import { Tweetos } from "../../../src/domain/models/tweetos"

describe('Comment', ()=>{
    
    beforeAll(()=> console.log("\nComment Domain Model"))

    it('should create', ()=>{
        const tweetos: Tweetos = new Tweetos("123", "email123@gamil.com", "Elon Musk", "", [])
        const comment = new Comment(tweetos, "a simple comment", "", "");
        expect(comment).toBeInstanceOf(Comment)
    })

    it('should throw an error if the content is empty', ()=>{
        const tweetos: Tweetos = new Tweetos("123", "email123@gamil.com", "Elon Musk", "", [])
        const commentFactory = () => new Comment(tweetos, "", "", "");
        expect(commentFactory).toThrowError("the comment is empty")
    })
})