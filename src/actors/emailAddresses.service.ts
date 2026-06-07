import { BadRequestException, Injectable } from "@nestjs/common";
import { EmailAddressDTO } from "./actors.dtos";
import { Actor } from "./actor.entity";
import { EmailAddressesReadService } from "../emailAddressesRead/emailAddressesRead.service";
import { EmailAddress } from "./emailAddress.entity";
import { AssetsService } from "./assets.service";

@Injectable()
export class EmailAddressesService extends AssetsService<EmailAddress> {
    constructor(
        private readonly emailAddressesReadService: EmailAddressesReadService
    ) {
        super();
    }

    async addNewEmailAddress(actor: Actor, addressString: string, isDefault: boolean): Promise<Actor> {
        if (await this.emailAddressesReadService.checkingExisting(addressString))
            throw new BadRequestException(`Existing Email Address : ${addressString}`)

        let emailAddressEntity = new EmailAddress();
        emailAddressEntity = this.setAssetAttributes(emailAddressEntity);

        emailAddressEntity.addressString = addressString,
            emailAddressEntity.isDefault = isDefault;
        actor.emailAddresses = [emailAddressEntity];

        return actor;
    }

    async createNewEmailAddressRead(actorId: string, assetId: string, addressString: string) {
        await this.emailAddressesReadService.createNewEmailAddress(actorId, assetId, addressString)
    }

    entityToDto(entity: EmailAddress): EmailAddressDTO {
        const dto = new EmailAddressDTO();
        dto.assetId = entity.assetId;
        dto.addressString = entity.addressString;
        dto.isDefault = entity.isDefault;
        return dto;
    }
}

