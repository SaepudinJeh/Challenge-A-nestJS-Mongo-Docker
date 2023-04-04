import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'src/dto/userCreateInfo';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';
import { UserInfoRepository } from 'src/repositories/userInfo.repository';
import { UserInfo } from 'src/schema/userInfo.schema';

@Injectable()
export class UserInfoService {
  constructor(private readonly userInfoRepository: UserInfoRepository) {}

  async userCreate(userCreate: UserCreateDto): Promise<UserInfo | null> {
    return await this.userInfoRepository.create(userCreate);
  }

  async userUpdate(userUpdate: UserUpdateDto): Promise<UserInfo | null> {
    const { _id, ...payload } = userUpdate;

    return await this.userInfoRepository.findOneAndUpdate(
      { _id },
      { $set: payload },
    );
  }

  async findUsers(): Promise<UserInfo[]> {
    return await this.userInfoRepository.find({});
  }
}
