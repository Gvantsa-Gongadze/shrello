import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './schemas/board.schema';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    await this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }
}