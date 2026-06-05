import { Injectable } from "@nestjs/common";
import { EmailAddress } from "./emailAddress.entity"
import { EmailAddressDTO } from "./emailAddresses.dtos"

@Injectable()
export class EmailAddressesService {
    async addEmailAddress(dto: EmailAddressDTO): Promise<EmailAddress> {
        const emailAddress = new EmailAddress();
        emailAddress.addressString = dto.addressString;
        emailAddress.default = dto.default;
        return emailAddress;
    }

    entityToDto(entity: EmailAddress): EmailAddressDTO {
        const dto = new EmailAddressDTO();
        dto.addressString = entity.addressString;
        dto.default = entity.default;
        return dto;
    }
}

