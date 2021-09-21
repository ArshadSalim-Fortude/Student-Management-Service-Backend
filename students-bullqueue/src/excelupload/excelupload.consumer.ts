import { ExceluploadService } from './excelupload.service';
import { OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as XLSX from 'xlsx';
import { request, gql } from 'graphql-request';
import * as SC from 'socketcluster-client'




@Processor('excelupload-queue')
export class ExceluploadConsumer {

    constructor(){}

    @Process('excelupload-job')
    async uploadExcelJob(job: Job<any>){
        console.log("consumer",job.data.students);
        let excelfile = XLSX.readFile(`./src/upload-folder/${job.data.students}`, {type: 'binary'});
        let jsonDataTemp: any;
        let jsonData = [];
        excelfile.SheetNames.forEach(sheet => {
            jsonDataTemp = XLSX.utils.sheet_to_json(excelfile.Sheets[sheet], {raw: false});
            //console.log("Json excel file",jsonData);
        });

        await jsonDataTemp.map(async(data: any) => {
            console.log("individual data", data);
            let tempdob = new Date(data.dob)
            var year = tempdob.getFullYear();
            var month = tempdob.getMonth();
            var day = tempdob.getDate();
            let today = new Date();
            var d = today.getFullYear();
            let age: number = d - year;
            if (
                today.getMonth() < month ||
                (today.getMonth() == month && today.getDate() < day)
            ) {
                age--;
            }
            await Object.assign(data, {age: age});
            jsonData.push({
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                grade: data.grade,
                division: data.division,
                dob: data.dob,
                age: data.age
            });
        })

        let sending =  await request(
            'http://localhost:3000/graphql',
            gql`
                mutation($jsonData: JSON!){
                    bulkInsert(students: {
                        jsonData: $jsonData
                    })
                }
            `,
            {
                jsonData: jsonData
            }
        ).then((data:any) => {
            console.log("Data back after bulk insert", data);
            return data;
        }).catch(err => {
            console.log("error is",err);
            return err;
        })

        return sending;
    }

    @OnQueueCompleted()
    completed(job: Job, result: any){
        console.log("result back after bulk insert", result);
        
    }

    @OnQueueFailed()
    failed(job: Job, err: Error){
        console.log("error", err);
        
    }
}