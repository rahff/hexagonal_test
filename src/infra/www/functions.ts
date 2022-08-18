import express, { Application, Router } from "express";
import { Server } from "http";
import { features } from "process";
import { helloWorldController } from "../controller/hello-world.controller";
import { Task } from "../interfaces/api";
import router from "../routes"



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

