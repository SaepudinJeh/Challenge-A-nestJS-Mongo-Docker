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
import { UserLoginDto } from 'src/dto/user.login';

@Controller('api/v1')
@ApiTags('Auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger: Logger = new Logger(AppController.name);

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  async userRegister(
    @Body() userRegister: UserRegister,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const hashPassword = await bcrypt.hash(
      userRegister.password,
      parseInt(process.env.SALT_HASH) ?? 10,
    );

    try {
      const { password, ...user } = await this.appService.registerUser({
        ...userRegister,
        password: hashPassword,
      });

      this.logger.log(user);
      console.log('user', user);

      return res.status(201).json({
        statusCode: 201,
        user: user,
      });
    } catch (error) {
      this.logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      });
    }
  }

  @Post('login')
  async loginUser(
    @Body() userLogin: UserLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.appService.findUser(userLogin.username);
      const comparePassword = await bcrypt.compare(
        userLogin.password,
        user.password,
      );

      if (!comparePassword) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      }

      return res.json({
        statusCode: 200,
        user,
      });
    } catch (error) {
      this.logger.error(error.status);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Invalid credentials',
      });
    }
  }

  @Post('users')
  async getUsers(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const users = await this.appService.findUsers();

    return res.json({
      statusCode: 200,
      users,
    });
  }
}
