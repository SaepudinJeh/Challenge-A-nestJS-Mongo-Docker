import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/database/abstract.repository';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger: Logger = new Logger(UserRepository.name);

  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
