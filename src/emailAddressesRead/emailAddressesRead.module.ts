import { Module } from "@nestjs/common";
import { EmailAddressesReadService } from "./emailAddressesRead.service";
import { EmailAddressRead } from "./emailAddressRead.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailAddressRead], "rdb")
    ],
    providers: [
        EmailAddressesReadService
    ],
    exports: [
        EmailAddressesReadService
    ]
})
export class EmailAddressesReadModule { }