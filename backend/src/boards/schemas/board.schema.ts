import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
    @Prop({ required: true})
    owner: User;

    @Prop({ required: true })
    title: String;

    @Prop({ default: '' })
    description: String;

    @Prop({ default: null })
    image: String;

    @Prop({ default: null })
    color: String;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
