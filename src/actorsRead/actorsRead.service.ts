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

    /*async searchActor(dto: SearchActorsRequestDTO): Promise<SearchActorsResponseDTO> {
        const Actors = await this.entityRepository.find({ where: { fullName: dto.fullName } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        let responseDTO = new SearchActorsResponseDTO();
        responseDTO.actors = [];
        Actors.forEach(actor => {
            responseDTO.actors.push(this.entityToDTO(actor))
        });

        return responseDTO;
    }

    /*async createNewActorRead(actorId: string): Promise<ActorRead> {
        let actorReadEntity = new ActorRead();
    }

    entityToDTO(actorReadEntity: ActorRead): ActorRead {*/
}