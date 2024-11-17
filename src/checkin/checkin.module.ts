import { Module } from '@nestjs/common';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { ReservaRepository } from '../reserva/reserva.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from '../reserva/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity])],
  controllers: [CheckinController],
  providers: [CheckinService, ReservaRepository],
})
export class CheckinModule {}
