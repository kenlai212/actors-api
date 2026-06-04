import { Module } from "@nestjs/common";
import { EmailAddressesService } from "./emailAddresses.service";

@Module({
    providers: [
        EmailAddressesService
    ],
    exports: [
        EmailAddressesService
    ]
})
export class EmailAddressesModule { }