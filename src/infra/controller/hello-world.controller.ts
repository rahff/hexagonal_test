import { Response, Request } from "express";

export class HelloWorldController {

    public sayHello(req: Request, res: Response): any {
        return res.send('Hello World')
    }
}

export const helloWorldController = new HelloWorldController()