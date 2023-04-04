import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response, Express } from 'express';
import { diskStorage } from 'multer';
import { UserCreateDto } from 'src/dto/userCreateInfo';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UserInfoService } from 'src/services/userInfo.service';
import { editFileName, fileFilter } from 'src/utils/imageValidator.util';

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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update User' })
  @Post('updateProfile')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter,
    }),
  )
  async userUpdate(
    @Body() userUpdate: UserUpdateDto,
    @UploadedFile()
    image: Express.Multer.File,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      this.logger.log(image);

      const userInfo = await this.userInfoService.userUpdate({
        ...userUpdate,
        image: image?.path,
      });

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
