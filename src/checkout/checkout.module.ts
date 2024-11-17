import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { ReservaRepository } from '../reserva/reserva.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from '../reserva/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity])],
  controllers: [CheckoutController],
  providers: [CheckoutService, ReservaRepository],
})
export class CheckoutModule {}
