import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { CountryCode } from "./phoneNumberRead.entity";
import { PhoneNumberType } from "../actors/phoneNumber.entity";

export class PhoneNumberReadDTO {
    @ApiProperty({
        description: `Actor ID`,
        example: '96e4e28e'
    })
    actorId: string;

    @ApiProperty({
        description: `Asset ID`,
        example: 'b69a-6b0709559596'
    })
    assetId: string;

    @ApiProperty({
        description: 'Phone Number country code',
        enum: CountryCode,
        example: CountryCode.HK
    })
    countryCode: CountryCode;

    @ApiProperty({
        description: 'Phone Number',
        example: "12345678"
    })
    numberString: string;

    @ApiProperty({
        description: 'Phone Number Type',
        enum: PhoneNumberType,
        enumName: "PhoneNumberType",
        example: PhoneNumberType.MOBILE
    })
    phoneNumberType: PhoneNumberType;
}

export class FindPhoneNumberRequestDTO {
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
    @IsEnum(CountryCode)
    countryCode!: CountryCode;

    @ApiPropertyOptional({
        description: `Phone Number String`,
        example: `12345678`
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    numberString!: string;
}