import { Injectable } from '@nestjs/common';
import { UserRegister } from 'src/dto/userRegister.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(userRegister: UserRegister): Promise<User | null> {
    return await this.userRepository.create(userRegister);
  }
}
