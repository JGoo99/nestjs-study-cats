import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../schemas/cats.schema';

export class CatReadonlyDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '67d6ea7658aee66eba4f7364',
    description: 'id',
  })
  id: string;
}
