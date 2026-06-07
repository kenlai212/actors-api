import { Column } from "typeorm";
import { Asset } from "./asset.entity";

export class EmailAddress extends Asset {
    @Column({
        nullable: false,
        type: "string",
    })
    addressString: string;

    @Column({
        nullable: false,
        type: "string",
    })
    isDefault: boolean;
}