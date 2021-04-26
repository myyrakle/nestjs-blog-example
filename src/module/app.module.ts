import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/provider/database.provider';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
