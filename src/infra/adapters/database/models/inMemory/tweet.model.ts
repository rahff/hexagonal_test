import { BaseModel } from './base-model';
import { TweetosModel } from './tweetos.model';
import { Comment } from '../../../../../domain/models/comment';



export interface TweetModel extends BaseModel {
     id: string,  
     content: string,   
     tweetos: TweetosModel,  
     likes: number,  
     comments: Comment[]
}