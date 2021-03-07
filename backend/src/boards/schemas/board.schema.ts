import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
    @Prop()
    owner: User;

    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    image: String;

    @Prop()
    color: String;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
