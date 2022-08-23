import { Router } from "express";
import { commentTweetHandler } from "./handlers/comment-tweet-handler";
import { createTweetHandler } from "./handlers/create-tweet-handler";
import { createTweetosHandler } from "./handlers/create-tweetos-handler";
import { likeTweetHandler } from "./handlers/like-tweet-handler";



const router = Router()

router.get('/tweet/like/:tweetId', likeTweetHandler)
router.post('/tweet', createTweetHandler);
router.post('/tweetos', createTweetosHandler);
router.post('/comments/add', commentTweetHandler);


export default router;