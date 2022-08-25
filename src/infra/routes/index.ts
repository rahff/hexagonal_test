import { Router } from "express";
import { commentTweetController } from "../controllers/comment-tweet.controller";
import { createTweetController } from "../controllers/create-tweet.controller";
import { createTweetosController } from "../controllers/create-tweetos.controller";
import { getTweetListController } from "../controllers/get-tweet-list.controller";
import { likeTweetController } from "../controllers/like-tweet.controller";



const router = Router()

router.get('/tweets', getTweetListController)
router.get('/tweet/like/:tweetId', likeTweetController)
router.post('/tweet', createTweetController);
router.post('/tweetos', createTweetosController);
router.post('/comments/add', commentTweetController);


export default router;