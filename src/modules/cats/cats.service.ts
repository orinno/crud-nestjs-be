import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepo: Repository<Cat>,
  ) {}

  async create(dto: CreateCatDto) {
     const rowCheck = await this.catRepo.count({
      where: [{ name: dto.name }],
    });

    if (rowCheck > 0) {
      throw new Error('Name already exists');
    }

    return this.catRepo.save(dto);
  }

  findAll() {
    return this.catRepo.find();
  }

  findOne(id: number) {
   return this.catRepo.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateCatDto) {
     const cat = await this.findOne(id);
    if (!cat) {
      throw new NotFoundException();
    }

    const rowCheck = await this.catRepo.count({
      where: [
        { name: dto.name, id: Not(cat.id) },
        { furColor: dto.furColor, id: Not(cat.id) },
      ],
    });

    if (rowCheck > 0) {
      throw new Error('Name or fur color already exists');
    }

    return this.catRepo.save({
      ...cat,
      ...dto,
    });
  }

  remove(id: number) {
     return this.catRepo.softDelete({ id });
  }
}
