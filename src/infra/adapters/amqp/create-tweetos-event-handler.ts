import { AmqpInterface } from "../../rmq/amqp";
import { CreateTweetosProducerEvent } from "../../../domain/ports/driven/handlers/create-tweetos-handler";
import { Channel } from "amqplib";
import { TweetosDto } from "../../../domain/ports/driver/tweetos.dtos";



export class CreateTweetosProducerEventAdapter implements CreateTweetosProducerEvent {

    private producer!: Channel
    constructor(private amqp: AmqpInterface){
        this.producer = this.amqp.createTweetosChannel.producer
    }

    sendToQueue(createTweetosEvent: TweetosDto): void {
        this.producer.sendToQueue(this.amqp.createTweetosChannel.queue, Buffer.from(JSON.stringify(createTweetosEvent)));
    }
}


export class CreateTweetosProducerEventAdapterStub implements CreateTweetosProducerEvent {

    constructor(){}

    sendToQueue(createTweetosEvent: TweetosDto): void {
       console.log("sended to queue", createTweetosEvent);
       
    }
}
