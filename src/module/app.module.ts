import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { UserController } from 'src/controller/user.controller';
import { databaseProviders } from 'src/provider/database.provider';
import { UserRepository } from 'src/repository/user.repository';
import { UserService } from 'src/service/user.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, UserRepository, ...databaseProviders],
})
export class AppModule {}
