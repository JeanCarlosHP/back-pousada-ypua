import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservaRepository } from '../reserva/reserva.repository';
import { StatusReserva } from '../reserva/enum/StatusReserva.enum';

@Injectable()
export class CheckinService {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async realizarCheckin(codigo: string): Promise<string> {
    try {
      const reserva = await this.reservaRepository.searchByCode(codigo);
      if (!reserva) {
        throw new NotFoundException('Reserva não encontrada.');
      }

      const hoje = new Date().toISOString().split('T')[0];

      if (reserva.dataEntrada != hoje) {
        throw new BadRequestException('A data do check-in é inválida.');
      }

      reserva.status = StatusReserva.EM_PROCESSAMENTO;
      await this.reservaRepository.save(reserva);

      return 'Check-in realizado com sucesso.';
    } catch (error) {
      throw new BadRequestException(
        `Erro ao realizar check-in: ${error.message || 'Erro desconhecido.'}`,
      );
    }
  }
}
