import { BaseModel } from './base-model';

export interface TweetosModel extends BaseModel {
    email: string; 
    username: string;  
    avatar: string; 
    followers: string[]
}