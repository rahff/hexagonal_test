import { Application } from "express";
import { createApplication, startServer } from "./functions";


const app: Application = createApplication();


startServer(3000, app);
