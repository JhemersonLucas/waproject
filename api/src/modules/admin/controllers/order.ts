import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('/order')
export class OrderController {
  constructor(private OrderRepository: OrderRepository, private OrderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.OrderRepository.list(model);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.OrderRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.OrderService.remove(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: SaveValidator) {
    return this.OrderService.save(model);
  }
}
