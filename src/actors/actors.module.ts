import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "./actor.entity";
import { ActorsController } from "./actors.controller";
import { ActorsService } from "./actors.service";
import { HttpModule } from "@nestjs/axios";
import { EmailAddressesReadModule } from "../emailAddressesRead/emailAddressesRead.module";
import { EmailAddressesService } from "./emailAddresses/emailAddresses.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Actor]),
        HttpModule,
        EmailAddressesReadModule
    ],
    controllers: [
        ActorsController
    ],
    providers: [
        ActorsService, EmailAddressesService
    ]
})
export class AgencyActorsModule { }