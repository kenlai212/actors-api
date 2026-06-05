import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorType, Actor } from "./actor.entity";
import { Repository } from "typeorm";
import { ActorDTO, NewActorRequestDTO, SearchActorsRequestDTO, SearchActorsResponseDTO, UpdateActorDTO } from "./actors.dtos";
import { EmailAdddressesReadService } from "../emailAddressesRead/emailAddressesRead.service";
import { EmailAddress } from "./emailAddresses/emailAddress.entity";
import { EmailAddressesService } from "./emailAddresses/emailAddresses.service";

@Injectable()
export class ActorsService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(Actor)
        private readonly entityRepository: Repository<Actor>,
        private readonly emailAddressesService: EmailAddressesService,
        private readonly emailAddressesReadService: EmailAdddressesReadService
    ) { }

    async createActor(dto: NewActorRequestDTO): Promise<ActorDTO> {
        let entity = new Actor();
        entity.fullName = dto.fullName;

        entity.dob = dto.dob;
        entity.gender = dto.gender;
        entity.countryOfResidence = dto.countryOfResidence;
        entity.actorType = dto.ActorType;
        entity.residencyStatus = dto.residencyStatus;

        //validate emailAddress if exist in request body
        if (dto.emailAddress) {
            if (await this.emailAddressesReadService.checkingExisting(dto.emailAddress))
                throw new BadRequestException(`Existing Email Address : ${dto.emailAddress}`)

            let emailAddressEntity = new EmailAddress();
            emailAddressEntity.addressString = dto.emailAddress,
                emailAddressEntity.default = true
            entity.emailAddresses = [emailAddressEntity];
        }

        ///////////////////////////save Actor record //////////////////////////
        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createActor() not available");
            });

        let actorDTO = this.entityToDTO(entity);

        ///////////////////////////save email address record//////////////////////////////////////
        if (dto.emailAddress) {
            await this.emailAddressesReadService.createNewEmailAddress(entity.actorId, dto.emailAddress)
            let emailAddressDTO = this.emailAddressesService.entityToDto(entity.emailAddresses[0]);
            actorDTO.emailAddresses = [emailAddressDTO];
        }

        this.logger.log(`Created new Actor ${entity.fullName} ${entity.actorId}`)
        return actorDTO;
    }

    async findActor(actorType: ActorType, actorId: string): Promise<ActorDTO> {
        let Actor = await this.entityRepository.findOne({ where: { actorId, actorType } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        if (!Actor) {
            throw new NotFoundException(" Actor not found");
        }

        return this.entityToDTO(Actor);
    }

    async deleteActor(actorId: string): Promise<string> {
        let actor = await this.entityRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        if (!actor) {
            throw new NotFoundException("Actor not found");
        }

        const actorName = actor.fullName;

        await this.entityRepository.remove(actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        const msg = `Successfully deleted ${this.entityRepository.metadata.name} ${actorName}`
        this.logger.log(msg);
        return msg;
    }

    async updateActor(dto: UpdateActorDTO): Promise<ActorDTO> {
        let Actor = await this.entityRepository.findOne({ where: { actorId: dto.actorId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("updateActor() not available");
            });

        if (!Actor)
            throw new NotFoundException(`Invalid actorId ${dto.actorId}`);

        if (dto.ActorType)
            Actor.actorType = dto.actorType;

        if (dto.fullName)
            Actor.fullName = dto.fullName;

        if (dto.gender)
            Actor.gender = dto.gender;

        if (dto.countryOfResidence)
            Actor.countryOfResidence = dto.countryOfResidence;

        if (dto.residencyStatus)
            Actor.residencyStatus = dto.residencyStatus;

        Actor = await this.entityRepository.save(Actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("updateActor() not available");
            });

        return this.entityToDTO(Actor);
    }

    async searchActor(dto: SearchActorsRequestDTO): Promise<SearchActorsResponseDTO> {
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

    async validateActorId(actorId: string) {
        const candidate = await this.entityRepository.findOne({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("validateActorId() not available");
            });

        if (!candidate)
            throw new BadRequestException(`Invalid actorId : ${actorId}`)
    }

    private entityToDTO(entity: Actor): ActorDTO {
        let dto = new ActorDTO();
        dto.actorId = entity.actorId;
        dto.actorType = entity.actorType;
        dto.fullName = entity.fullName;
        dto.gender = entity.gender;
        dto.dob = entity.dob;
        dto.countryOfResidence = entity.countryOfResidence;
        dto.residencyStatus = entity.residencyStatus;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}