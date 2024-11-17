import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { ReservaModule } from './reserva/reserva.module';
import { HospedeModule } from './hospede/hospede.module';
import { AcomodacaoModule } from './acomodacao/acomodacao.module';
import { MapsModule } from './maps/maps.module';
import { MailModule } from './mail/mail.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CheckinModule } from './checkin/checkin.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    ReservaModule,
    HospedeModule,
    AcomodacaoModule,
    UsuarioModule,
    MapsModule,
    MailModule,
    AutenticacaoModule,
    CheckinModule,
    CheckoutModule,
  ],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule { }
