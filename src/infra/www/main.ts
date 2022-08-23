import { Application } from "express";
import { MongoConnection } from "../database";
import { createApplication, startServer } from "./bootstrap";




const app: Application = createApplication();

MongoConnection.start()
.then(()=> {
    startServer(3000, app);
})
.catch((error: any)=> console.log(error))




