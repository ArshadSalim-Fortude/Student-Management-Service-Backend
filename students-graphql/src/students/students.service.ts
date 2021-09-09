import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentRepository.findOne(id);
  }

  async create(student: CreateStudentInput): Promise<Student> {
    //console.log("student date", student);
    const { firstName, lastName, grade, division, dob, email } = student;

    var year = dob.getFullYear();
    var month = dob.getMonth();
    var day = dob.getDate();
    let today = new Date();
    var d = today.getFullYear();
    let age: number = d - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }
    return await this.studentRepository.save({
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      division: division,
      email: email,
      dob: dob,
      age: age,
    });

  }

  async update(
    id: string,
    studentupdate: UpdateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName, grade, division, dob, email } = studentupdate;
    let age: number;
    if (dob) {
      var year = dob.getFullYear();
      var month = dob.getMonth();
      var day = dob.getDate();
      let today = new Date();
      var d = today.getFullYear();
      age = d - year;
      if (
        today.getMonth() < month ||
        (today.getMonth() == month && today.getDate() < day)
      ) {
        age--;
      }
    }
    let stud: Student = this.studentRepository.create({
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      division: division,
      dob: dob,
      email: email,
      age: age,
    });
    stud.studentId = id;
    await this.studentRepository.save(stud);
    return await this.findOne(id);
    
  }

  async remove(id: string) {
    let stud = await this.findOne(id);
    if (stud) {
      let tempdel: Student = await this.studentRepository.create(stud);
      let del = await this.studentRepository.delete(id);
      if ((await del).affected === 1) {
        return tempdel;
      }
    }
    throw new NotFoundException(`No student record by id ${id} can be found!`);
  }
}
