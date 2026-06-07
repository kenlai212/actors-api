import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ActorReadDTO {
    @ApiProperty({
        description: 'Actor ID'
    })
    actorId: string;

    @ApiProperty({
        description: `Actor Type`,
    })
    actorType: string;

    @ApiProperty({
        description: 'Actor fullname',
    })
    fullName: string;

    @ApiProperty({
        description: 'Record creation datetime'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Record last update datetime'
    })
    updatedAt: Date;
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
    actors: ActorReadDTO[];
}