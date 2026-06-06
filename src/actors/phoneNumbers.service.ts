import { Injectable } from "@nestjs/common";
import { PhoneNumberDTO } from "./actors.dtos";
import { CountryCode, PhoneNumber, PhoneNumberType } from "./phoneNumber.entity";
import { Actor } from "./actor.entity";
import { PhoneNumbersReadService } from "../phoneNumbersRead/phoneNumbersRead.service";

@Injectable()
export class PhoneNumbersService {
    constructor(
        private readonly phoneNumbersReadService: PhoneNumbersReadService
    ) { }

    async createNewPhoneNumberRead(actorId: string, countryCode: CountryCode, numberString: string) {
        await this.phoneNumbersReadService.createNewPhoneNumber(actorId, countryCode, numberString);
    }

    async addPhoneNumber(actor: Actor, countryCode: CountryCode, numberString: string, phoneNumberType: PhoneNumberType): Promise<Actor> {
        let phoneNumberEntity = new PhoneNumber();
        phoneNumberEntity.countryCode = countryCode;
        phoneNumberEntity.numberString = numberString;
        phoneNumberEntity.phoneNumberType = phoneNumberType;
        actor.phoneNumbers = [phoneNumberEntity];

        return actor;
    }

    entityToDTO(entity: PhoneNumber): PhoneNumberDTO {
        let dto = new PhoneNumberDTO();
        dto.countryCode = entity.countryCode;
        dto.numberString = entity.numberString;
        dto.phoneNumberType = entity.phoneNumberType;

        return dto;
    }
}