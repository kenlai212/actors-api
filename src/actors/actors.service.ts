import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorType, Actor } from "./actor.entity";
import { Repository } from "typeorm";
import { ActorDTO, NewActorRequestDTO, SearchActorsRequestDTO, SearchActorsResponseDTO, UpdateActorDTO } from "./actors.dtos";
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

    async createActor(dto: NewActorRequestDTO): Promise<ActorDTO> {
        let actor = new Actor();
        actor.fullName = dto.fullName;

        actor.dob = dto.dob;
        actor.gender = dto.gender;
        actor.countryOfResidence = dto.countryOfResidence;
        actor.actorType = dto.ActorType;
        actor.residencyStatus = dto.residencyStatus;

        //validate emailaddress and add to actor entity if email address is provided in the request
        if (dto.emailAddress)
            actor = await this.emailAddressesService.addNewEmailAddress(actor, dto.emailAddress, true);

        //add phone number to actor entity if phone number string, country code and phone number type are provided in the request
        if (dto.numberString && dto.countryCode && dto.phoneNumberType) {
            actor = await this.phoneNumbersService.addPhoneNumber(actor, dto.countryCode, dto.numberString, dto.phoneNumberType);
        }

        //save Actor record 
        actor = await this.entityRepository.save(actor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createActor() not available");
            });

        let actorDTO = this.entityToDTO(actor)

        //save email address record if email address is provided in the request
        if (dto.emailAddress) {
            await this.emailAddressesService.createNewEmailAddressRead(actor.actorId, actor.emailAddresses[0].assetId, dto.emailAddress);
            let emailAddressDTO = this.emailAddressesService.entityToDto(actor.emailAddresses[0]);
            actorDTO.emailAddresses = [emailAddressDTO];
        }

        //save phone number record if phone number string, country code and phone number type are provided in the request
        if (dto.numberString && dto.countryCode && dto.phoneNumberType) {
            await this.phoneNumbersService.createNewPhoneNumberRead(actor.actorId, actor.phoneNumbers[0].assetId, dto.countryCode, dto.numberString);
            let phoneNumberDTO = this.phoneNumbersService.entityToDTO(actor.phoneNumbers[0]);
            actorDTO.phoneNumbers = [phoneNumberDTO];
        }

        this.logger.log(`Created new Actor ${actor.fullName} ${actor.actorId}`)
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