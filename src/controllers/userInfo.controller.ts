import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserCreateDto } from 'src/dto/userCreateInfo';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UserInfoService } from 'src/services/userInfo.service';

@Controller('api/v1')
@ApiTags('User')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}
  private readonly logger: Logger = new Logger(UserInfoController.name);

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create User' })
  @Post('createProfile')
  async userCreate(
    @Body() userCreate: UserCreateDto,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userInfo = await this.userInfoService.userCreate(userCreate);

      return res.json({
        statusCode: HttpStatus.CREATED,
        user: userInfo,
      });
    } catch (error) {
      this.logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update User' })
  @Post('updateProfile')
  async userUpdate(
    @Body() userUpdate: UserUpdateDto,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userInfo = await this.userInfoService.userUpdate(userUpdate);

      return res.json({
        statusCode: 200,
        user: userInfo,
      });
    } catch (error) {
      this.logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'find Users' })
  @Get('getProfile')
  async findUsers(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const userInfo = await this.userInfoService.findUsers();

      return res.json({
        statusCode: HttpStatus.OK,
        user: userInfo,
      });
    } catch (error) {
      this.logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message || error,
      });
    }
  }
}
