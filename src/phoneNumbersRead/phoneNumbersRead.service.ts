import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CountryCode, PhoneNumberRead } from "./phoneNumberRead.entity";
import { PhoneNumberReadDTO } from "./phoneNumberRead.dtos";

@Injectable()
export class PhoneNumbersService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(PhoneNumberRead, "rdb")
        private readonly entityRepository: Repository<PhoneNumberRead>,
    ) { }

    async findPhoneNumber(countryCode: CountryCode, numberString: string): Promise<PhoneNumberReadDTO> {
        const whereClause = { countryCode: countryCode, numberString: numberString };

        const phoneNumber = await this.entityRepository.findOne({ where: whereClause })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("searchPhoneNuber() not available");
            })

        if (!phoneNumber)
            throw new NotFoundException(`Phone Number not found`);

        return this.entityToDTO(phoneNumber);
    }

    async validateUniquePhoneNumber(countryCode: CountryCode, numberString: string) {
        let phoneNumber = await this.entityRepository.findOne({ where: { countryCode, numberString } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewPhoneNumber() not available");
            })

        if (phoneNumber)
            throw new BadRequestException(`Phone Number ${countryCode} ${numberString} already exist`);
    }

    entityToDTO(entity: PhoneNumberRead): PhoneNumberReadDTO {
        let dto = new PhoneNumberReadDTO();
        dto.assetId = entity.assetId;
        dto.countryCode = entity.countryCode;
        dto.numberString = entity.numberString;

        return dto;
    }
}