import { Column } from "typeorm";

export enum PhoneNumberType {
    MOBILE = "MOBILE",
    HOME = "HOME",
    OFFICE = "OFFICE",
}

export enum CountryCode {
    HK = "+852",
    CH = "+86",
    SG = "+65",
    JP = "+81"
}

export class PhoneNumber {
    @Column({
        nullable: false,
        type: "enum",
        enum: CountryCode,
    })
    countryCode: CountryCode;

    @Column({
        nullable: false,
        type: "varchar",
        length: 64,
    })
    numberString: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: PhoneNumberType,
    })
    phoneNumberType: PhoneNumberType
}