import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ActorRead {
    @PrimaryGeneratedColumn('uuid')
    actorId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "string",
    })
    actorType: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    fullName: string;

    @Column({
        nullable: true,
        type: "date",
        default: null
    })
    dob!: Date;

    @Column({
        nullable: true,
        type: "string",
        default: null
    })
    gender!: string;

    @Column({
        nullable: true,
        type: "string",
        default: null
    })
    countryOfResidence: string;

    @Column({
        nullable: true,
        type: "string",
        default: null
    })
    residencyStatus: string;
}