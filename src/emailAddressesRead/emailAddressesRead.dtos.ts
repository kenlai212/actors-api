import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class EmailAddressReadDTO {
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
        description: 'Record creation datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    createdAt: Date

    @ApiProperty({
        description: 'Record last update datetime',
        example: 'YYYY-MM-DDTHH:mm:ss.sssZ'
    })
    updatedAt: Date

    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    addressString: string;
}

export class FindEmailAddressRequestDTO {
    @ApiPropertyOptional({
        description: 'Asset ID',
    })
    @IsOptional()
    @IsString()
    @MaxLength(36)
    assetId!: string;

    @ApiPropertyOptional({
        description: `Actor's Email Address`,
        example: "john.smith@test.com"
    })
    @IsOptional()
    @IsEmail()
    addressString!: string;
}