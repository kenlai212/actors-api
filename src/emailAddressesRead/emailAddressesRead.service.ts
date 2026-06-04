import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailAddressRead } from "./emailAddressRead.entity";
import { Repository } from "typeorm";
import { EmailAddressReadDTO, FindEmailAddressRequestDTO } from "./emailAddressesRead.dtos";

@Injectable()
export class EmailAdddressesReadService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(EmailAddressRead, "rdb")
        private readonly entityRepository: Repository<EmailAddressRead>
    ) { }

    async createNewEmailAddress(actorId: string, addressString: string): Promise<EmailAddressReadDTO> {
        let emailAddressEntity = new EmailAddressRead();

        if (await this.checkingExisting(addressString) === true)
            throw new BadRequestException(`${addressString} already exist.`);
        emailAddressEntity.addressString = addressString;

        emailAddressEntity.actorId = actorId;

        emailAddressEntity = await this.entityRepository.save(emailAddressEntity)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        return this.entityToDTO(emailAddressEntity);
    }

    /*async findEmailAddress(dto: FindEmailAddressRequestDTO): Promise<EmailAddressReadDTO> {
        if (!dto.assetId && !dto.addressString)
            throw new BadRequestException(`Must provide atleast one of actorId or addressString`);

        let whereClause = {}
        if (dto.assetId)
            whereClause = { assetId: dto.assetId }
        else
            whereClause = { addressString: dto.addressString }

        const emailAddress = await this.entityRepository.findOne({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchEmailAddresses() not available");
            })

        if (!emailAddress)
            throw new NotFoundException(`Invalid assetId or addressString`);

        return this.entityToDTO(emailAddress);
    }*/

    async checkingExisting(addressString: string): Promise<boolean> {
        const existingEmailAddress = await this.entityRepository.findOne({ where: { addressString } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        if (existingEmailAddress)
            return true;
        else
            return false;
    }

    entityToDTO(entity: EmailAddressRead): EmailAddressReadDTO {
        let dto = new EmailAddressReadDTO();
        dto.actorId = entity.actorId;
        dto.assetId = entity.assetId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.addressString = entity.addressString;

        return dto;
    }
}