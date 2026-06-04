import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgencyActor } from "./agencyActor.entity";
import { AgencyActorsController } from "./agencyActor.controller";
import { AgencyActorsService } from "./agencyActors.service";
import { HttpModule } from "@nestjs/axios";
import { EmailAddressesReadModule } from "../emailAddressesRead/emailAddressesRead.module";
import { EmailAddressesModule } from "../emailAddresses/emailAddress.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([AgencyActor]),
        HttpModule,
        EmailAddressesModule,
        EmailAddressesReadModule
    ],
    controllers: [
        AgencyActorsController
    ],
    providers: [
        AgencyActorsService
    ],
    exports: [
        AgencyActorsService
    ]
})
export class AgencyActorsModule { }