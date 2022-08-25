import express, { Application } from "express";
import { Server } from "http";
import router from "../routes"



export const createApplication = (): Application => {
    const app: Application = express();
    app.use(express.json());
    app.use("/api", router);
    return app;
}

export const startServer = (port: number = 3000, app: Application): Server => {
    const server = app.listen(port, ()=> { console.log(`listen on port ${port}`)});
    return server;
}




