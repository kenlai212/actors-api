import { Injectable } from "@nestjs/common";
import { EmailAddress } from "./emailAddress.entity"
import { EmailAddressDTO } from "./emailAddresses.dtos"

@Injectable()
export class EmailAddressesService {
    entityToDto(entity: EmailAddress): EmailAddressDTO {
        const dto = new EmailAddressDTO();
        dto.addressString = entity.addressString;
        dto.default = entity.default;
        return dto;
    }
}

