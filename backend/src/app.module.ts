import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module'
import { BoardsModule } from './boards/boards.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.fnexl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }),
        UsersModule,
        BoardsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
