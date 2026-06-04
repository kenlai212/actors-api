import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDate, IsDateString, IsEnum, IsUUID, IsArray } from 'class-validator';
import { AgencyActorType, Country, Gender, ResidencyStatus } from "./agencyActor.entity";
import { EmailAddressDTO } from "../emailAddresses/emailAddresses.dtos";

export class AgencyActorDTO {
    @ApiProperty({
        description: 'Target Agency Actor ID'
    })
    actorId: string;

    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        enum: AgencyActorType,
        enumName: "AgencyActorType"
    })
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: 'Actor fullname',
    })
    fullName: string;

    @ApiPropertyOptional({
        description: `Actor's Gender : ${Object.keys(Gender)}`,
        enum: Gender,
        enumName: "Gender"
    })
    gender!: Gender;

    @ApiPropertyOptional({
        description: `Actor's Date of Birth`
    })
    dob!: Date;

    @ApiPropertyOptional({
        description: `Actors's Email Addresses`
    })
    emailAddresses: EmailAddressDTO[];

    @ApiProperty({
        description: 'Record creation datetime'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Record last update datetime'
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: `Actor's country of resistence : : ${Object.keys(Country)}`,
        example: Country.SG
    })
    countryOfResidence: Country;

    @ApiPropertyOptional({
        description: `Actor's recidency status : ${Object.keys(ResidencyStatus)}`,
        example: `${ResidencyStatus.EMPLOYMENT_PASS}`
    })
    residencyStatus!: ResidencyStatus;
}

export class FindAgencyActorRequestDTO {
    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        enum: AgencyActorType,
        enumName: "AgencyActorType"
    })
    @IsEnum(AgencyActorType)
    @IsNotEmpty()
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    @IsNotEmpty()
    @IsUUID()
    actorId: string;
}

export class NewAgencyActorRequestDTO {
    @ApiProperty({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        example: AgencyActorType.CANDIDATE
    })
    @IsNotEmpty()
    @IsEnum(AgencyActorType)
    agencyActorType: AgencyActorType;

    @ApiProperty({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    fullName: string;

    @ApiProperty({
        description: `Actor's Email Address`,
        example: "jane.smith@test.com"
    })
    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @ApiPropertyOptional({
        description: `Actor's gender : ${Object.keys(Gender)}`,
        example: `${Gender.FEMALE}`,
        enum: Gender
    })
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Date of Birth for the Candidate',
        example: `2005-11-30`
    })
    @IsDateString()
    @IsOptional()
    dob: Date;

    @ApiPropertyOptional({
        description: `Actor's country of residence : ${Object.keys(Country)}`,
        example: `${Country.SG}`,
        enum: Country
    })
    @IsOptional()
    @IsEnum(Country)
    countryOfResidence: Country;

    @ApiPropertyOptional({
        description: `Actor's recidency status : ${Object.keys(ResidencyStatus)}`,
        example: `${ResidencyStatus.EMPLOYMENT_PASS}`,
        enum: ResidencyStatus
    })
    @IsOptional()
    @IsEnum(ResidencyStatus)
    residencyStatus: ResidencyStatus;
}

export class UpdateAgencyActorDTO extends NewAgencyActorRequestDTO {
    @ApiProperty({
        description: 'Target Agency Actor ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    @IsNotEmpty()
    @IsUUID()
    actorId: string;

    @ApiPropertyOptional({
        description: `Agency Actor Type : ${Object.keys(AgencyActorType)}`,
        example: AgencyActorType.CANDIDATE
    })
    @IsOptional()
    declare agencyActorType: AgencyActorType;

    @ApiPropertyOptional({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    declare fullName: string;


}

export class SearchAgencyActorsRequestDTO {
    @ApiProperty({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    fullName: string;
}

export class SearchAgencyActorsResponseDTO {
    @ApiProperty({
        description: `List of Actors`
    })
    @IsNotEmpty()
    @IsArray()
    agencyActors: AgencyActorDTO[];
}