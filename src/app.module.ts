import { Module } from '@nestjs/common';
import { CategoriesModule } from './api/categories/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
