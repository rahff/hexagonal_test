import { Router } from "express";
import { commentTweetController } from "../controllers/comment-tweet.controller";
import { createTweetController } from "../controllers/create-tweet.controller";
import { createTweetosController } from "../controllers/create-tweetos.controller";
import { getTweetListController } from "../controllers/get-tweet-list.controller";
import { likeTweetController } from "../controllers/like-tweet.controller";
import { checkToken } from "../middlewares/check-token.middleware";



const router = Router()

router.get('/tweets',checkToken, getTweetListController)
router.get('/tweet/like/:tweetId',checkToken, likeTweetController)
router.post('/tweet', checkToken, createTweetController);
router.post('/tweetos', createTweetosController);
router.post('/comments/add', checkToken, commentTweetController);


export default router;