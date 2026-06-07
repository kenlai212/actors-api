import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IssueDocType, IssuerGoverment } from "./govIssueDoc.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateNewAssetRequestDTO } from "./assets.dtos";

export class NewGovIssueDocRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: `Issuer Goverment : ${Object.keys(IssuerGoverment)}`,
        example: IssuerGoverment.HK
    })
    @IsNotEmpty()
    @IsEnum(IssuerGoverment)
    issuerGoverment: IssuerGoverment;

    @ApiPropertyOptional({
        description: `Issue Document Type : ${Object.keys(IssueDocType)}`,
        example: IssueDocType.IDENTITY_CARD
    })
    @IsOptional()
    issueDocType: IssueDocType;

    @ApiPropertyOptional({
        description: 'doc unique identifier',
        example: "HK12345"
    })
    @IsOptional()
    @IsString()
    issueDocNumber: string;
}