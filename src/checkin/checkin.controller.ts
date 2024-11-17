import { Controller, Post, Body } from '@nestjs/common';
import { CheckinService } from './checkin.service';

@Controller('/checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post()
  async realizarCheckin(@Body('codigo') codigo?: string) {
    return await this.checkinService.realizarCheckin(codigo);
  }
}
