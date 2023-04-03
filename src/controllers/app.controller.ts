import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UserRegister } from 'src/dto/userRegister.dto';
import { AppService } from 'src/services/app.service';

@Controller('api/v1')
@ApiTags('Auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  async userRegister(
    @Body() userRegister: UserRegister,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const logger: Logger = new Logger('user register');

    const hashPassword = await bcrypt.hash(
      userRegister.password,
      parseInt(process.env.SALT_HASH) ?? 10,
    );

    try {
      const { password, ...user } = await this.appService.registerUser({
        ...userRegister,
        password: hashPassword,
      });

      logger.log(user);
      console.log('user', user);

      return res.status(201).json({
        statusCode: 201,
        user: user,
      });
    } catch (error) {
      logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      });
    }
  }
}
