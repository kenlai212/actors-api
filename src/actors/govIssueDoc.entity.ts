import { Column } from "typeorm";
import { Asset } from "./asset.entity";

export enum IssuerGoverment {
    CN = "CN",
    HK = "HK",
    SG = "SG",
    JP = "JP"
}

export enum IssueDocType {
    PASSPORT = "PASSPORT",
    IDENTITY_CARD = "IDENTITY_CARD",
    DRIVERS_LICENSE = "DRIVERS_LICENSE"
}

export class GovIssueDoc extends Asset {
    @Column({
        nullable: false,
        type: "enum",
        enum: IssuerGoverment
    })
    issuerGoverment!: IssuerGoverment;

    @Column({
        nullable: true,
        type: "enum",
        enum: IssueDocType
    })
    issueDocType!: IssueDocType;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    issueDocNumber!: string;
}