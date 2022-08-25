import express, { Application } from "express";
import { Server } from "http";
import { helloWorldController } from "../services/hello-world.service";
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




