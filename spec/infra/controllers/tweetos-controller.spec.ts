import { Application } from "express";
import { Server } from "http";
import { ICreateTweetosRequestDto } from "../../../src/domain/modules/ports/driver/tweetos.dtos";
import { agent } from "supertest";
import { createApplication, startServer } from "../../../src/infra/www/bootstrap";



describe('Tweetos Controller integration', ()=>{
    beforeAll(()=> console.log("Tweetos Controller integration\n"));

    let app: Application = createApplication()
    let server: Server = startServer(3002, app)
    let req = agent(app);

    describe('Create Tweetos Request', ()=>{
        beforeAll(()=> console.log("Create Tweetos Request\n"));
        it('should create a new tweetos', async ()=>{
            const creatTweetosRequest: ICreateTweetosRequestDto = { username: "Tinitin", avatar: "", email: "tintindu93@gmail.com" }
            const createTweetosResponse = await req.post("/api/tweetos").send(creatTweetosRequest);
            expect(createTweetosResponse.status).toBe(201)
        })
    })

    afterAll(()=>{
        server.close(()=> console.log("\nserver closed"));
    })
})