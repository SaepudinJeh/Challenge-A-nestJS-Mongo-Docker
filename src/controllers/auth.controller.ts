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
import { UserService } from 'src/services/user.service';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('api/')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger: Logger = new Logger(AuthController.name);

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
      const { password, ...user } = await this.userService.registerUser({
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
  @ApiOperation({ summary: 'Login User' })
  async loginUser(
    @Body() userLogin: UserLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.findUser(userLogin.username);
      const comparePassword = await bcrypt.compare(
        userLogin.password,
        user.password,
      );

      // comparing password
      if (!comparePassword) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      }

      // generate token
      const { password, ...newUser } = user;

      const token = this.jwtService.sign({
        username: newUser.username,
        _id: newUser._id,
        email: newUser.email,
      });

      return res.status(200).json({
        statusCode: 200,
        userInfo: { ...newUser },
        token,
      });
    } catch (error) {
      this.logger.error(error.status);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Invalid credentials',
      });
    }
  }
}
