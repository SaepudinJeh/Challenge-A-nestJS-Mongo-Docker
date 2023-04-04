import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, default: 'username' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, default: 'password' })
  password: string;
}
