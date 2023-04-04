import { Injectable } from '@nestjs/common';
import { UserRegister } from 'src/dto/userRegister.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(userRegister: UserRegister): Promise<User | null> {
    return await this.userRepository.create(userRegister);
  }

  async findUsers(): Promise<User[] | null> {
    return await this.userRepository.find({});
  }

  async findUser(query: string): Promise<User | null> {
    return await this.userRepository.findOne({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
  }
}
