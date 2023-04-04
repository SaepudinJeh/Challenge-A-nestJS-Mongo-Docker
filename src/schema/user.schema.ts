import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema()
export class User extends AbstractDocument {
  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).index(
  { username: 1, email: 1 },
  { unique: true },
);
