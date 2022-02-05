import {
  Body,
  Controller,
  Logger,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import {
  CreateCategoriesDTO,
  UpdateCategoriesDTO,
} from './dtos/Categories.dto';

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
  createCategory(@Body() createCategoryDto: CreateCategoriesDTO) {
    this.clientAdminBackend.emit('create-category', createCategoryDto);
  }

  @Get('categories/')
  findByIdCategory(@Query('id') _id: string) {
    return this.clientAdminBackend.send('find-category', _id ? _id : '');
  }

  @Put('categories/:_id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoriesDTO,
    @Param('_id') _id: string,
  ) {
    this.clientAdminBackend.emit('update-category', {
      id: _id,
      category: updateCategoryDto,
    });
  }
}
