import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cats.schema';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cat-request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    return (await this.catModel.exists({ email })) !== null;
  }

  async save(catDto: CatRequestDto) {
    await this.catModel.create(catDto);
  }
}
