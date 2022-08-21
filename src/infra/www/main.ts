import { Application } from "express";
import { createApplication, startServer } from "./bootstrap";




const app: Application = createApplication();
startServer(3000, app);



