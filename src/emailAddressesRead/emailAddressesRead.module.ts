import { Module } from "@nestjs/common";
import { EmailAdddressesReadService } from "./emailAddressesRead.service";
import { EmailAddressRead } from "./emailAddressRead.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailAddressRead], "rdb")
    ],
    providers: [
        EmailAdddressesReadService
    ],
    exports: [
        EmailAdddressesReadService
    ]
})
export class EmailAddressesReadModule { }