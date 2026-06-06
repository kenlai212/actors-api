import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { PhoneNumberType } from "../actors/phoneNumber.entity";

export class PhoneNumberReadDTO {
    @ApiProperty({
        description: `Actor ID`,
    })
    actorId: string;

    @ApiProperty({
        description: `Asset ID`,
    })
    assetId: string;

    @ApiProperty({
        description: 'Phone Number country code'
    })
    countryCode: string;

    @ApiProperty({
        description: 'Phone Number',
    })
    numberString: string;

    @ApiProperty({
        description: 'Phone Number Type'
    })
    phoneNumberType: string;
}

/*export class FindPhoneNumberRequestDTO {
    @ApiPropertyOptional({
        description: 'Asset ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    assetId!: string;

    @ApiPropertyOptional({
        description: `Phone Number Country Code ${Object.values(CountryCode)}`,
        example: CountryCode.HK,
        enum: CountryCode,
        enumName: "countryCode"
    })
    @IsOptional()
    @Is(CountryCode)
    countryCode!: CountryCode;

    @ApiPropertyOptional({
        description: `Phone Number String`,
        example: `12345678`
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    numberString!: string;
}*/