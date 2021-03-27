import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsController } from './boards.controller';
import { BoardsService } from './board.service';
import { Board, BoardSchema } from './schemas/board.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}