import { Repository } from "../../../../../domain/ports/out/repositories";
import { TweetosModel } from "../../models/inMemory/tweetos.model";
import { AbstractRepository } from "./abstract-repository";



export class TweetosRepository extends AbstractRepository<TweetosModel> implements Repository<TweetosModel> {}

export const tweetosRepositoryInMemoInstance = new TweetosRepository();