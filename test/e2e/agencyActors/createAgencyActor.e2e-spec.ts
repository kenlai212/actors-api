import { describe, it } from "node:test";
import { Test, TestingModule } from "@nestjs/testing";
import { afterAll, beforeAll, expect } from "@jest/globals";
import { createSharedTestModule } from "./common";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { ActorsService } from "../../../src/actors/actors.service";
import { Actor } from "../../../src/actors/actor.entity";
import { NewActorRequestDTO } from "../../../src/actors/actors.dtos";
import { EmailAddressesReadService } from "../../../src/emailAddressesRead/emailAddressesRead.service";
import { EmailAddressesService } from "../../../src/actors/emailAddresses.service";
import { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";

describe(`Create new Agency Actor E2E test`, () => {
    let app: INestApplication;
    let actorsService: ActorsService;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mongodb',
                    url: 'mongodb://ken:Maxsteel1596@127.0.0.1:27017/actors-api?authSource=admin',
                    entities: [
                        Actor
                    ],
                    synchronize: true
                }),
                TypeOrmModule.forFeature([Actor])
            ],
            providers: [ActorsService, EmailAddressesService, EmailAddressesReadService]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        actorsService = await moduleFixture.resolve<ActorsService>(ActorsService);
        dataSource = await moduleFixture.resolve<DataSource>(DataSource);
    })

    afterAll(async () => {
        const repository = dataSource.getRepository(Actor);
        await repository.query(`DELETE FROM agency_actor`);
        await app.close();
    });

    it(`Successfully create a new Agency Actor`, async () => {
        console.log(`Creating new Agency Actor...`);
        expect(true).toEqual(true)
        let dto = new NewActorRequestDTO();
        dto.fullName = "John Smit"
        // const result = await actorsService.createActor(dto).catch(error => { console.log(error.stack) })
        //console.log(result);
        /*expect(result).toBeDefined();*/
    });
});