import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat-request.dto';
import * as argon2 from 'argon2';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signup(catDto: CatRequestDto): Promise<void> {
    const { email, name, password } = catDto;
    const isCatExist = await this.catsRepository.existByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('already exist email');
    }

    const hashedPassword = await argon2.hash(password);
    await this.catsRepository.save({
      email,
      name,
      password: hashedPassword,
    });
  }

  findAll() {}
}
