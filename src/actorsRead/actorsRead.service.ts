import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorRead } from "./actorRead.entity";
import { Repository } from "typeorm";

@Injectable()
export class ActorsReadService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(ActorRead, "rdb")
        private readonly entityRepository: Repository<ActorRead>
    ) { }

    /*async createNewActorRead(actorId: string): Promise<ActorRead> {
        let actorReadEntity = new ActorRead();
    }

    entityToDTO(actorReadEntity: ActorRead): ActorRead {*/
}