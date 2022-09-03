import { amqp } from "../../../infra/rmq/amqp";
import { CreateTweetos } from "../features/create-tweetos.feature";
import { CreateTweetosProducerEventAdapter, CreateTweetosProducerEventAdapterStub } from "../../../infra/adapters/amqp/create-tweetos-event-handler";
import { CreatTweetosDaoAdapter } from "../../../infra/adapters/dao/create-tweetos-dao-adapter";
import { tweetosMongoRepository } from "../../../infra/adapters/repositories/tweetos-repository";

export class CreateTweetosModule {

    static get(): CreateTweetos {
        const amqpInterface = amqp.getChannels();
        const amqpAdapter = new CreateTweetosProducerEventAdapter(amqpInterface);
        const creteTweetosMongoDao = new CreatTweetosDaoAdapter(tweetosMongoRepository);
        return new CreateTweetos(creteTweetosMongoDao, amqpAdapter);
    }

    static forTesting(): CreateTweetos {
        const amqpAdapter = new CreateTweetosProducerEventAdapterStub();
        const creteTweetosMongoDao = new CreatTweetosDaoAdapter(tweetosMongoRepository);
        return new CreateTweetos(creteTweetosMongoDao, amqpAdapter);
    }
}
