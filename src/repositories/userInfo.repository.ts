import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { UserInfo } from 'src/schema/userInfo.schema';

@Injectable()
export class UserInfoRepository extends AbstractRepository<UserInfo> {
  protected readonly logger: Logger = new Logger(UserInfoRepository.name);

  constructor(@InjectModel(UserInfo.name) userModel: Model<UserInfo>) {
    super(userModel);
  }
}
