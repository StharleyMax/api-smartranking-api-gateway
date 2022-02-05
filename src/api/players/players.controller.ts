import {
  Body,
  Controller,
  Logger,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ClientProxySmartRanking } from 'src/proxyrmq/clientProxy';
import { CreatePlayerDTO, UpdatePlayerDTO } from './dtos/players.dto';

@Controller('api/v1/players')
export class PlayersController {
  private logger = new Logger(PlayersController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post()
  @UsePipes(ValidationPipe)
  async Create(@Body() createPlayerDTO: CreatePlayerDTO) {
    this.logger.log('CreatePlayers: ', JSON.stringify(createPlayerDTO));

    const { category } = createPlayerDTO;

    const existCategory = await this.clientAdminBackend
      .send('find-category', category)
      .toPromise();

    if (existCategory) {
      this.clientAdminBackend.emit('create-players', createPlayerDTO);
    } else {
      throw new BadRequestException(`Category ${category} not fount`);
    }
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('_id') _id: string,
  ) {
    this.clientAdminBackend.emit('update-players', {
      _id,
      updatePlayerDTO,
    });
  }

  @Get()
  async findPlayers(@Query('id') _id: string) {
    return this.clientAdminBackend.send('find-Players', _id ? _id : '');
  }

  @Delete('/:_id')
  remove(@Param('_id') _id: string) {
    return this.clientAdminBackend.emit('delete-players', _id);
  }
}
