import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "./actor.entity";
import { ActorsController } from "./actors.controller";
import { ActorsService } from "./actors.service";
import { HttpModule } from "@nestjs/axios";
import { EmailAddressesReadModule } from "../emailAddressesRead/emailAddressesRead.module";
import { EmailAddressesService } from "./emailAddresses.service";
import { PhoneNumbersService } from "./phoneNumbers.service";
import { phoneNumbersReadModule } from "../phoneNumbersRead/phoneNumbersRead.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Actor]),
        HttpModule,
        EmailAddressesReadModule,
        phoneNumbersReadModule
    ],
    controllers: [
        ActorsController
    ],
    providers: [
        ActorsService, EmailAddressesService, PhoneNumbersService
    ]
})
export class AgencyActorsModule { }