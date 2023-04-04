import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ required: false, type: String, default: 'mongoID' })
  _id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  displayName?: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  @IsIn(['male', 'female'], { message: 'Gender must be "male" or "female"' })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: Date,
    default: 'Tue Apr 04 2023 10:19:38 GMT+0700 (Western Indonesia Time)',
  })
  birthday?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  horoscope?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  zodiac?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  height?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  weight?: number;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @ApiProperty({ required: false, type: Array })
  interest?: string[];
}
