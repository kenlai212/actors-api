import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum CountryCode {
    HK = "+852",
    CH = "+86",
    SG = "+65",
    JP = "+81"
}

@Entity()
export class PhoneNumberRead {
    @PrimaryGeneratedColumn('uuid')
    assetId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

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
}