import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    profile_picture: string;

    @Prop()
    firstName: String

    @Prop()
    lastName: String

    @Prop()
    boards: []
}

export const UserSchema = SchemaFactory.createForClass(User);