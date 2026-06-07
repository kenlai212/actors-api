import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PhoneNumberRead {
    @PrimaryColumn()
    assetId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    actorId: string

    @Column({
        nullable: false,
        type: "varchar",
    })
    countryCode: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 64,
    })
    numberString: string;
}