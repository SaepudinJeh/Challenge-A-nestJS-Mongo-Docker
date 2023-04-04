import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String })
  displayName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  image?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String, default: 'gender' })
  @IsIn(['male', 'female'], { message: 'Gender must be "male" or "female"' })
  gender: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    type: Date,
    default: 'Tue Apr 04 2023 10:19:38 GMT+0700 (Western Indonesia Time)',
  })
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String })
  horoscope: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String })
  zodiac: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: Number })
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: Number })
  weight: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ApiProperty({ required: true, type: Array })
  interest: string[];
}
