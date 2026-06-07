import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Actor } from "./actor.entity";
import { Asset } from "./asset.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export abstract class AssetsService<T extends Asset> {
    protected readonly logger = new Logger(this.constructor.name);
    @InjectRepository(Actor)
    protected readonly actorRepository: Repository<Actor>

    async getActorEntity(actorId: string): Promise<Actor> {
        let actor = await this.actorRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("actorRepositry.findOne() not available");
            });

        if (!Actor) {
            throw new NotFoundException(`Invalid actorId ${actorId}`);
        }

        return actor;
    }

    async saveActor(actor: Actor): Promise<Actor> {
        actor = await this.actorRepository.save(actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("actorRepositry.save() not available");
            });
        return actor;
    }

    setAssetAttributes(entity: T): T {
        entity.assetId = crypto.randomUUID();
        entity.createdAt = new Date();
        entity.updatedAt = new Date();

        return entity;
    }
}