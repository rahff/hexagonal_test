
import { EntityManager, EntityTarget } from 'typeorm';
import { MongoConnection } from '../..';
import { Repository } from '../../../../../domain/ports/out/repositories';





export class AbstractRepository {

    protected repository!: Repository<any>

    private manager!: EntityManager;
    constructor(private entity: EntityTarget<any>){
        this.initManager();
    }
    
    async initManager(): Promise<void> {
        this.manager = await MongoConnection.start();
        this.repository = this.manager.getRepository(this.entity);
    }
}