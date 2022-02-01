import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoriesDTO } from './dtos/Categories.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoriesDTO) {
    return await this.clientAdminBackend.emit(
      'create-category',
      createCategoryDto,
    );
  }
}
