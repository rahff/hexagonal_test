import { Repository } from "../../../../../domain/ports/out/repositories";
import { TweetosModel } from "../../models/tweetos.model";

import { AbstractInMemoryRepository } from "./abstract-inMemory-repository";



export class TweetosRepository extends AbstractInMemoryRepository<TweetosModel> implements Repository<TweetosModel> {}

export const tweetosRepositoryInMemoInstance = new TweetosRepository();