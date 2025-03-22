import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { APP_ROLES, PROFILE_STATUS } from 'utils/constants';

export class CreateProfileDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    required: true,
    enum: PROFILE_STATUS,
  })
  isVerified: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(APP_ROLES, { each: true })
  @ApiProperty({
    required: true,
    enum: APP_ROLES,
    type: [String],
    example: APP_ROLES.CONTRACTOR,
  })
  roles: APP_ROLES[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  disabled?: boolean;
}
