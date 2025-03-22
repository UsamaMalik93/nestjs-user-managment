import { ApiProperty } from '@nestjs/swagger';
import { Sources } from 'utils/constants';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterProfileDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'USAMAOFFICAIL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  company: string;

  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsPhoneNumber('US')
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  phone: string;

  @IsEnum(Sources)
  @ApiProperty({ enum: Sources, example: Sources.Other })
  @IsNotEmpty()
  source: Sources;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  reason: string;
}
