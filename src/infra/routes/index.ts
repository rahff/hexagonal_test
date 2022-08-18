import { Router } from "express";
import { createTweethandler } from "./handlers/create-tweet-handler";



const router = Router()

router.post('/tweet', createTweethandler);


export default router;