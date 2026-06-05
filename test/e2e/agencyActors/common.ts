import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Test, TestingModule } from "@nestjs/testing";
import { Actor } from "../../../src/actors/actor.entity";
import { ActorsService } from "../../../src/actors/actors.service";

dotenv.config({ path: '' + __dirname + '../../../.env' });

export const createSharedTestModule = async (): Promise<TestingModule> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb://ken:Maxsteel1596@127.0.0.1:27017/agency-actors-api?authSource=admin',
                entities: [
                    Actor
                ],
                synchronize: true
            }),
            TypeOrmModule.forFeature([Actor])
        ],
        providers: [ActorsService]
    }).compile();

    return moduleFixture;
}