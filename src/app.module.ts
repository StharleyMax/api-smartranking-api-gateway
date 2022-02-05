import { Module } from '@nestjs/common';
import { CategoriesModule } from './api/categories/categories.module';
import { PlayersModule } from './api/players/players.module';

@Module({
  imports: [CategoriesModule, PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
