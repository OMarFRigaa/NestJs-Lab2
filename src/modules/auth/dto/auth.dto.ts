import { ApiProperty } from '@nestjs/swagger';

class BaseAuthDto {
  @ApiProperty({
    example: 'islam@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: '123456789',
  })
  password: string;
}

export class SignInDto extends BaseAuthDto {}

export class SignUpDto extends BaseAuthDto {
  @ApiProperty({
    example: 'Islam',
  })
  name: string;

  @ApiProperty({
    example: '01234567890',
  })
  phone: string;
  @ApiProperty({
    example: 25,
  })
  age: number;
}
