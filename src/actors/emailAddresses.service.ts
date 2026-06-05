import { BadRequestException, Injectable } from "@nestjs/common";
import { EmailAddressDTO } from "./actors.dtos";
import { Actor, EmailAddress } from "./actor.entity";
import { EmailAddressesReadService } from "../emailAddressesRead/emailAddressesRead.service";

@Injectable()
export class EmailAddressesService {
    constructor(
        private readonly emailAddressesReadService: EmailAddressesReadService
    ) { }

    async addNewEmailAddress(actor: Actor, addressString: string, isDefault: boolean): Promise<Actor> {
        if (await this.emailAddressesReadService.checkingExisting(addressString))
            throw new BadRequestException(`Existing Email Address : ${addressString}`)

        let emailAddressEntity = new EmailAddress();
        emailAddressEntity.addressString = addressString,
            emailAddressEntity.default = isDefault;
        actor.emailAddresses = [emailAddressEntity];

        return actor;
    }

    async createNewEmailAddressRead(actorId: string, addressString: string) {
        await this.emailAddressesReadService.createNewEmailAddress(actorId, addressString)
    }

    entityToDto(entity: EmailAddress): EmailAddressDTO {
        const dto = new EmailAddressDTO();
        dto.addressString = entity.addressString;
        dto.default = entity.default;
        return dto;
    }
}

