import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgencyActorType, AgencyActor } from "./agencyActor.entity";
import { Repository } from "typeorm";
import { AgencyActorDTO, NewAgencyActorRequestDTO, SearchAgencyActorsRequestDTO, SearchAgencyActorsResponseDTO, UpdateAgencyActorDTO } from "./agencyActors.dto";
import { EmailAdddressesReadService } from "../emailAddressesRead/emailAddressesRead.service";
import { EmailAddress } from "../emailAddresses/emailAddress.entity";
import { EmailAddressesService } from "../emailAddresses/emailAddresses.service";

@Injectable()
export class AgencyActorsService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(AgencyActor)
        private readonly entityRepository: Repository<AgencyActor>,
        private readonly emailAddressesService: EmailAddressesService,
        private readonly emailAddressesReadService: EmailAdddressesReadService
    ) { }

    async createAgencyActor(dto: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        let entity = new AgencyActor();
        entity.fullName = dto.fullName;

        entity.dob = dto.dob;
        entity.gender = dto.gender;
        entity.countryOfResidence = dto.countryOfResidence;
        entity.agencyActorType = dto.agencyActorType;
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

        ///////////////////////////save AgencyActor record //////////////////////////
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

    async findAgencyActor(agencyActorType: AgencyActorType, actorId: string): Promise<AgencyActorDTO> {
        let agencyActor = await this.entityRepository.findOne({ where: { actorId, agencyActorType } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        if (!agencyActor) {
            throw new NotFoundException("Agency Actor not found");
        }

        return this.entityToDTO(agencyActor);
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

    async updateAgencyActor(dto: UpdateAgencyActorDTO): Promise<AgencyActorDTO> {
        let agencyActor = await this.entityRepository.findOne({ where: { actorId: dto.actorId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("updateAgencyActor() not available");
            });

        if (!agencyActor)
            throw new NotFoundException(`Invalid actorId ${dto.actorId}`);

        if (dto.agencyActorType)
            agencyActor.agencyActorType = dto.agencyActorType;

        if (dto.fullName)
            agencyActor.fullName = dto.fullName;

        if (dto.gender)
            agencyActor.gender = dto.gender;

        if (dto.countryOfResidence)
            agencyActor.countryOfResidence = dto.countryOfResidence;

        if (dto.residencyStatus)
            agencyActor.residencyStatus = dto.residencyStatus;

        agencyActor = await this.entityRepository.save(agencyActor)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("updateAgencyActor() not available");
            });

        return this.entityToDTO(agencyActor);
    }

    async searchAgencyActor(dto: SearchAgencyActorsRequestDTO): Promise<SearchAgencyActorsResponseDTO> {
        const agencyActors = await this.entityRepository.find({ where: { fullName: dto.fullName } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        let responseDTO = new SearchAgencyActorsResponseDTO();
        responseDTO.agencyActors = [];
        agencyActors.forEach(actor => {
            responseDTO.agencyActors.push(this.entityToDTO(actor))
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

    private entityToDTO(entity: AgencyActor): AgencyActorDTO {
        let dto = new AgencyActorDTO();
        dto.actorId = entity.actorId;
        dto.agencyActorType = entity.agencyActorType;
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