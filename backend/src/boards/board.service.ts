import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardsService {
    constructor(
        @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    ) {}

    async create(createBoardDto: CreateBoardDto): Promise<Board> {
        const createBoard = new this.boardModel(createBoardDto);
        return createBoard.save();
    }

    async findAll(): Promise<Board[]> {
        return this.boardModel.find().exec();
    }
}