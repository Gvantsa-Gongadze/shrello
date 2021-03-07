import { Board } from "src/boards/schemas/board.schema";

export interface CreateUserDto {
  email: string;
  profile_picture: string;
  firstName: string;
  lastName: string;
  boards: Board[];
  password: string;
}