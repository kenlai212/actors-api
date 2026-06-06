import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AgencyActorReadDTO {
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