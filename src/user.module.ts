import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AuthController } from './controllers/auth.controller';
import { UserInfoController } from './controllers/userInfo.controller';

import { DatabaseModule } from './database/database.module';
import { UserRepository } from './repositories/user.repository';
import { UserInfoRepository } from './repositories/userInfo.repository';
import { User, UserSchema } from './schema/user.schema';
import { UserInfo, UserInfoSchema } from './schema/userInfo.schema';
import { UserService } from './services/user.service';
import { UserInfoService } from './services/userInfo.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './.env',
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'secret_key',
          signOptions: {
            expiresIn: 60 * 10 * 24,
          },
        };
      },
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserInfo.name, schema: UserInfoSchema },
    ]),
  ],
  controllers: [AuthController, UserInfoController],
  providers: [
    UserService,
    UserRepository,
    JwtStrategy,
    UserInfoRepository,
    UserInfoService,
  ],
})
export class UserModule {}
