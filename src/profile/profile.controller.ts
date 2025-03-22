import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) {}
}
