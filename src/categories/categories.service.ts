import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService  {
  constructor(
  @InjectModel(Category) private categoryRepo: typeof Category
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRepo.create(createCategoryDto)
    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryRepo.findAll({include:{all: true}})
    return categories
  }

  async remove(id: number) {
    const category = await this.categoryRepo.destroy({where: {id}});

    if(!category){
      throw new HttpException('Foydalanuvchi yuq', HttpStatus.NOT_FOUND)
    }
    return {message: 'User uchirildi'}
  }

}
