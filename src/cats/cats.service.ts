import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cats.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async signup(catDto: CatRequestDto): Promise<void> {
    const { email, name, password } = catDto;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('already exist email');
    }
    const hashedPassword = await argon2.hash(password);

    await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
  }

  findAll() {}
}
