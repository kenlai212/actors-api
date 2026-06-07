import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateNewAssetRequestDTO {
    @ApiProperty({
        description: 'Actor ID',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    actorId: string;
}