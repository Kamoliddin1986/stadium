import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './models/category.model';
import { Stadium } from '../stadiums/models/stadium.model';
import { Region } from '../region/models/region.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Stadium])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
