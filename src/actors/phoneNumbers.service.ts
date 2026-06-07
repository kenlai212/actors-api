import { Injectable } from "@nestjs/common";
import { PhoneNumberDTO } from "./actors.dtos";
import { CountryCode, PhoneNumber, PhoneNumberType } from "./phoneNumber.entity";
import { Actor } from "./actor.entity";
import { PhoneNumbersReadService } from "../phoneNumbersRead/phoneNumbersRead.service";
import { randomUUID } from "crypto";
import { AssetsService } from "./assets.service";

@Injectable()
export class PhoneNumbersService extends AssetsService<PhoneNumber> {
    constructor(
        private readonly phoneNumbersReadService: PhoneNumbersReadService
    ) {
        super();
    }

    async createNewPhoneNumberRead(actorId: string, assetId: string, countryCode: CountryCode, numberString: string) {
        await this.phoneNumbersReadService.createNewPhoneNumber(actorId, assetId, countryCode, numberString);
    }

    async addPhoneNumber(actor: Actor, countryCode: CountryCode, numberString: string, phoneNumberType: PhoneNumberType): Promise<Actor> {
        let phoneNumberEntity = new PhoneNumber();
        phoneNumberEntity = this.setAssetAttributes(phoneNumberEntity);
        phoneNumberEntity.countryCode = countryCode;
        phoneNumberEntity.numberString = numberString;
        phoneNumberEntity.phoneNumberType = phoneNumberType;
        actor.phoneNumbers = [phoneNumberEntity];

        return actor;
    }

    entityToDTO(entity: PhoneNumber): PhoneNumberDTO {
        let dto = new PhoneNumberDTO();
        dto.assetId = entity.assetId;
        dto.countryCode = entity.countryCode;
        dto.numberString = entity.numberString;
        dto.phoneNumberType = entity.phoneNumberType;

        return dto;
    }
}