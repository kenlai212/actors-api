import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhoneNumberRead } from "./phoneNumberRead.entity";
import { PhoneNumbersReadService } from "./phoneNumbersRead.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhoneNumberRead], "rdb"),
    ],
    providers: [
        PhoneNumbersReadService
    ],
    exports: [
        PhoneNumbersReadService
    ]
})
export class phoneNumbersReadModule { }