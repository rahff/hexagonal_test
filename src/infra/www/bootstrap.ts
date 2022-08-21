import express, { Application } from "express";
import { Server } from "http";
import { helloWorldController } from "../controller/hello-world.controller";
import router from "../routes"
import { DataSource, EntityManager } from 'typeorm';
import { TweetModel } from "../adapters/database/models/tweet.model";
import { TweetosModel } from "../adapters/database/models/tweetos.model";


export function createApplication(): Application {
    const app: Application = express();
    app.use(express.json());
    app.use("/api", router);
    app.use("/", helloWorldController.sayHello);
    return app;
}

export function startServer(port: number = 3000, app: Application): Server {
    const server = app.listen(port, ()=> { console.log(`listen on port ${port}`)});
    return server;
}




