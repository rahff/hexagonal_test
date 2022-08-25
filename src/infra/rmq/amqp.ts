import { Connection, connect, Channel, ConsumeMessage, GetMessage, Message, Options, Replies } from "amqplib";



export interface AmqpInterface {
    createTweetosChannel: ChannelInterface;
}

export interface ChannelInterface {
    producer: Channel, 
    queue: string
}

export class AMQP {

    private connection: Connection | null = null;
    private createTweetosChannel: Channel | null = null;
    
    constructor(private amqpUrl: string){}

    async init(): Promise<void> {
        await this.connect();
        await this.createChannels();
        await this.createQueues();
    }

    public getConnection(): Connection {
        if(!this.connection) throw new Error("amqp is not connected");
        return this.connection;
    }

    public getChannels(): AmqpInterface {
        if(!this.createTweetosChannel) throw new Error("createTweetosChannel are not initialized");
        return {
            createTweetosChannel: {producer: this.createTweetosChannel, queue: "tweetos_created"}
        }
    }

    private async connect(): Promise<void>{
        this.connection = await connect(this.amqpUrl);
    }

    private async createChannels(): Promise<any> {
        if(!this.connection) throw new Error("amqp is not connected");
        this.createTweetosChannel = await this.connection.createChannel();
    }

    private async createQueues(): Promise<any> {
        if(!this.createTweetosChannel) throw new Error("channel does not exist");
        this.createTweetosChannel.assertQueue("tweetos_created");
    }

}


export const amqpInstance = new AMQP("");