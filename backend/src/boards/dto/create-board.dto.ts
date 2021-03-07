import { User } from "src/users/schemas/user.schema";

export interface CreateBoardDto {
    owner: User;
    title: String;
    description: String;
    image: String;
    color: String;
}