import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional, IsDateString, IsEnum, IsUUID, IsArray } from 'class-validator';
import { ActorType, Country, Gender, ResidencyStatus } from "./actor.entity";
import { EmailAddressDTO } from "./emailAddresses/emailAddresses.dtos";

export class ActorDTO {
    @ApiProperty({
        description: 'Target Actor ID'
    })
    actorId: string;

    @ApiProperty({
        description: `Actor Type : ${Object.keys(ActorType)}`,
        enum: ActorType,
        enumName: "ActorType"
    })
    actorType: ActorType;

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

export class FindActorRequestDTO {
    @ApiProperty({
        description: ` Actor Type : ${Object.keys(ActorType)}`,
        enum: ActorType,
        enumName: "ActorType"
    })
    @IsEnum(ActorType)
    @IsNotEmpty()
    actorType: ActorType;

    @ApiProperty({
        description: 'Target  Actor ID'
    })
    @IsNotEmpty()
    @IsUUID()
    actorId: string;
}

export class NewActorRequestDTO {
    @ApiProperty({
        description: `Actor Type : ${Object.keys(ActorType)}`,
        example: ActorType.CANDIDATE
    })
    @IsNotEmpty()
    @IsEnum(ActorType)
    ActorType: ActorType;

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

export class UpdateActorDTO extends NewActorRequestDTO {
    @ApiProperty({
        description: 'Target  Actor ID'
    })
    @IsNotEmpty()
    @IsUUID()
    actorId: string;

    @ApiPropertyOptional({
        description: `Actor Type : ${Object.keys(ActorType)}`,
        example: ActorType.CANDIDATE,
        enum: ActorType
    })
    @IsOptional()
    declare actorType: ActorType;

    @ApiPropertyOptional({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    declare fullName: string;
}

export class SearchActorsRequestDTO {
    @ApiProperty({
        description: `Actor's Full Name`,
        example: "Jane Smith"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    fullName: string;
}

export class SearchActorsResponseDTO {
    @ApiProperty({
        description: `List of Actors`
    })
    @IsNotEmpty()
    @IsArray()
    actors: ActorDTO[];
}