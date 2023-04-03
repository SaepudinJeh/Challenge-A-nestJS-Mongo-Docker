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

  // About user
  @Prop({ type: String, default: null })
  displayName?: string;

  @Prop({ type: String, default: null })
  image?: string;

  @Prop({ type: String, default: null })
  gender?: string;

  @Prop({ type: Date, default: null })
  birthday?: Date;

  @Prop({ type: String, default: null })
  horoscope?: string;

  @Prop({ type: String, default: null })
  zodiac?: string;

  @Prop({ type: Number, default: null })
  height?: number;

  @Prop({ type: Number, default: null })
  weight?: number;

  @Prop({ type: Array, default: [] })
  interest?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User).index(
  { username: 1, email: 1 },
  { unique: true },
);
