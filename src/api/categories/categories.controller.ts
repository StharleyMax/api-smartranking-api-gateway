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

import { ClientProxySmartRanking } from 'src/proxyrmq/clientProxy';
import {
  CreateCategoriesDTO,
  UpdateCategoriesDTO,
} from './dtos/Categories.dto';

@Controller('api/v1')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

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
