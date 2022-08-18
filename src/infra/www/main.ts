import { createApplication, startServer } from "./functions";


const app = createApplication();


startServer(3000, app);
