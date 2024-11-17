import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservaRepository } from '../reserva/reserva.repository';
import { StatusReserva } from '../reserva/enum/StatusReserva.enum';

@Injectable()
export class CheckoutService {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async realizarCheckout(codigo: string): Promise<string> {
    try {
      const reserva = await this.reservaRepository.searchByCode(codigo);
      if (!reserva) {
        throw new NotFoundException('Reserva não encontrada.');
      }

      if (reserva.status === StatusReserva.EM_PROCESSAMENTO) {
        reserva.status = StatusReserva.CONCLUIDO;
        await this.reservaRepository.save(reserva);
        return 'Check-out realizado com sucesso.';

      }
      throw new BadRequestException('Check-in não realizado para esta reserva.');
    } catch (error) {
      throw new BadRequestException(
        `Erro ao realizar check-out: ${error.message || 'Erro desconhecido.'}`,
      );
    }
  }
}
