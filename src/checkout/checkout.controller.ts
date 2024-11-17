import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async realizarCheckout(@Body('codigo') codigo?: string) {
    return await this.checkoutService.realizarCheckout(codigo);
  }
}
