import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExceluploadService } from './excelupload.service';
import { GraphQLUpload } from 'graphql-upload';
import * as fs from 'fs';
import * as path from 'path';
import { ExceluploadProducer } from './excelupload.producer.service';

@Resolver()
export class ExceluploadResolver {
  constructor(
    private readonly exceluploadService: ExceluploadService,
    private readonly exceluploadProducer: ExceluploadProducer
  ) {}

  @Query(()=>String, {name: 'hello'})
  helloMessage(){
    this.exceluploadService.helloMessage();
  }

  @Mutation(()=> String, {name: 'uploadexcel'})
  async uploadExcel(@Args({ name: 'file', type: () => GraphQLUpload }) file: any){
    console.log(file);
    const changedFilename = path.parse(file.filename).name+"-"+Math.round(Math.random()*100)/100+path.extname(file.filename);
    await file.createReadStream().pipe(fs.createWriteStream(`./src/upload-folder/${changedFilename}`));

    this.exceluploadProducer.uploadExcel(changedFilename); 
    return "Excel Uploaded";
  }

}
