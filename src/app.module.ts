import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AgencyActor } from './agencyActors/agencyActor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './app.config';
import { AgencyActorsModule } from './agencyActors/agencyActors.module';
import { EmailAddressesReadModule } from './emailAddressesRead/emailAddressesRead.module';
import { EmailAddressRead } from './emailAddressesRead/emailAddressRead.entity';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: 'mongodb://ken:Maxsteel1596@127.0.0.1:27017/agency-actors-api?authSource=admin',
        entities: [
          AgencyActor
        ],
        synchronize: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      name: "rdb",
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.get("database.userName"),
        password: configService.get("database.password"),
        database: configService.get("database.databaseName"),
        entities: [
          EmailAddressRead,
        ],
        synchronize: true,
        autoLoadEntities: true,
        logging: configService.get("database.logging"),
      }),
      inject: [ConfigService]
    }),
    AgencyActorsModule,
    EmailAddressesReadModule
  ]
})
export class AppModule { }
