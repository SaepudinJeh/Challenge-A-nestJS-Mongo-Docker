import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegister {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, default: 'username' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, required: true, default: 'email@mail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, default: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, default: 'password' })
  @Equals('password', {
    message: 'Passwords do not match',
  })
  confirmPassword: string;
}
