import { Module } from '@nestjs/common';
import { ExceluploadService } from './excelupload.service';
import { ExceluploadResolver } from './excelupload.resolver';
import { BullModule } from '@nestjs/bull';
import { ExceluploadProducer } from './excelupload.producer.service';
import { ExceluploadConsumer } from './excelupload.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'excelupload-queue'
    }),
  ],
  providers: [ExceluploadResolver, ExceluploadService, ExceluploadProducer, ExceluploadConsumer]
})
export class ExceluploadModule {}
