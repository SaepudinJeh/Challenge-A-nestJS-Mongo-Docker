import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema()
export class UserInfo extends AbstractDocument {
  @Prop({ type: String, default: null, required: true })
  displayName: string;

  @Prop({ type: String, default: null, required: false })
  image?: string;

  @Prop({ type: String, default: null, required: true })
  gender: string;

  @Prop({ type: Date, default: null, required: true })
  birthday: Date;

  @Prop({ type: String, default: null, required: true })
  horoscope: string;

  @Prop({ type: String, default: null, required: true })
  zodiac: string;

  @Prop({ type: Number, default: null, required: true })
  height: number;

  @Prop({ type: Number, default: null, required: true })
  weight: number;

  @Prop({ type: Array, default: [] })
  interest?: string[];
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
