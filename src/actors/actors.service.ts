import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorType, Actor } from "./actor.entity";
import { Repository } from "typeorm";
import { ActorDTO, NewActorRequestDTO, UpdateActorDTO } from "./actors.dtos";
import { EmailAddressesService } from "./emailAddresses.service";
import { PhoneNumbersService } from "./phoneNumbers.service";

@Injectable()
export class ActorsService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(Actor)
        private readonly entityRepository: Repository<Actor>,
        private readonly emailAddressesService: EmailAddressesService,
        private readonly phoneNumbersService: PhoneNumbersService
    ) { }

    async createActor(requestDTO: NewActorRequestDTO): Promise<ActorDTO> {
        let actor = new Actor();
        actor.fullName = requestDTO.fullName;

        actor.dob = requestDTO.dob;
        actor.gender = requestDTO.gender;
        actor.countryOfResidence = requestDTO.countryOfResidence;
        actor.actorType = requestDTO.ActorType;
        actor.residencyStatus = requestDTO.residencyStatus;

        //save Actor record 
        actor = await this.entityRepository.save(actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createActor() not available");
            });

        //save email address record if email address is provided in the request
        if (requestDTO.emailAddress)
            actor = await this.emailAddressesService.addNewEmailAddress(actor.actorId, requestDTO.emailAddress, true);

        //save phone number record if phone number string, country code and phone number type are provided in the request
        if (requestDTO.numberString && requestDTO.countryCode && requestDTO.phoneNumberType)
            actor = await this.phoneNumbersService.addPhoneNumber(actor.actorId, requestDTO.countryCode, requestDTO.numberString, requestDTO.phoneNumberType);

        const actorDTO = this.entityToDTO(actor)
        this.logger.log(`Created new Actor ${JSON.stringify(actorDTO)}`);
        return actorDTO;
    }

    async findActor(actorType: ActorType, actorId: string): Promise<ActorDTO> {
        let Actor = await this.entityRepository.findOne({ where: { actorId, actorType } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("findActor() not available");
            });

        if (!Actor) {
            throw new NotFoundException("Actor not found");
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

        await this.entityRepository.remove(actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("deleteActor() not available");
            });

        const msg = `Successfully deleted ${this.entityRepository.metadata.name} with actorId ${actorId}`;
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

        if (entity.emailAddresses && entity.emailAddresses.length > 0) {
            dto.emailAddresses = [];
            entity.emailAddresses.forEach(emailAddress => {
                dto.emailAddresses.push(this.emailAddressesService.entityToDto(emailAddress));
            });
        }

        if (entity.phoneNumbers && entity.phoneNumbers.length > 0) {
            dto.phoneNumbers = [];
            entity.phoneNumbers.forEach(phoneNumber => {
                dto.phoneNumbers.push(this.phoneNumbersService.entityToDTO(phoneNumber));
            });
        }

        return dto;
    }
}