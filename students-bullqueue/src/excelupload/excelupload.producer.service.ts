import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class ExceluploadProducer{
    constructor(@InjectQueue('excelupload-queue') private queue: Queue){}

    async uploadExcel(data: any){
        await this.queue.add('excelupload-job', {
            students: data
        },
        {
            delay: 5000,
        },
        )
    }
}