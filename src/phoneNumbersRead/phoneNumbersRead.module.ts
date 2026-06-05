import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhoneNumberRead } from "./phoneNumberRead.entity";
import { PhoneNumbersService } from "./phoneNumbersRead.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PhoneNumberRead]),
    ],
    providers: [
        PhoneNumbersService
    ],
    exports: [
        PhoneNumbersService
    ]
})
export class phoneNumbersModule { }