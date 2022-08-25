import { Application } from "express";
import { MongoConnection } from "../database";
import { amqp } from "../rmq/amqp";
import { createApplication, startServer } from "./bootstrap";




const app: Application = createApplication();


MongoConnection.start()
.then(()=> {
    amqp.init().then(()=>{
        startServer(3000, app);
    })
})
.catch((error: any)=> console.log(error))




