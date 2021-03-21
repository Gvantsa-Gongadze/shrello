import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    profile_picture: string;

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    id: string

    @Prop({default: false})
    confirmed: Boolean

    @Prop()
    token: string

    @Prop()
    boards: []
}

export const UserSchema = SchemaFactory.createForClass(User);