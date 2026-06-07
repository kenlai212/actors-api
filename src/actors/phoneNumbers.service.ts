import { Injectable } from "@nestjs/common";
import { PhoneNumberDTO } from "./actors.dtos";
import { CountryCode, PhoneNumber, PhoneNumberType } from "./phoneNumber.entity";
import { Actor } from "./actor.entity";
import { PhoneNumbersReadService } from "../phoneNumbersRead/phoneNumbersRead.service";
import { AssetsService } from "./assets.service";

@Injectable()
export class PhoneNumbersService extends AssetsService<PhoneNumber> {
    constructor(
        private readonly phoneNumbersReadService: PhoneNumbersReadService
    ) {
        super();
    }

    async addPhoneNumber(actorId: string, countryCode: CountryCode, numberString: string, phoneNumberType: PhoneNumberType): Promise<Actor> {
        let actor = await this.getActorEntity(actorId);

        let phoneNumberEntity = new PhoneNumber();
        phoneNumberEntity = this.setAssetAttributes(phoneNumberEntity);
        phoneNumberEntity.countryCode = countryCode;
        phoneNumberEntity.numberString = numberString;
        phoneNumberEntity.phoneNumberType = phoneNumberType;

        if (!actor.phoneNumbers || actor.phoneNumbers.length === 0) {
            actor.phoneNumbers = [phoneNumberEntity];
        } else {
            actor.phoneNumbers.push(phoneNumberEntity);
        }

        actor = await this.saveActor(actor);

        await this.phoneNumbersReadService.createNewPhoneNumber(actorId, phoneNumberEntity.assetId, countryCode, numberString);

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