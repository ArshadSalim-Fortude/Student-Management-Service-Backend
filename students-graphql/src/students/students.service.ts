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

  async findAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOneStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne(id);
  }

  async createStudent(student: CreateStudentInput): Promise<Student[]> {
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
    await this.studentRepository.save({
      firstName: firstName,
      lastName: lastName,
      grade: grade,
      division: division,
      email: email,
      dob: dob,
      age: age,
    });

    return await this.findAllStudents();

  }

  async updateStudent(
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
    return await this.findOneStudent(id);
    
  }

  async removeStudent(id: string) {
    let stud = await this.findOneStudent(id);
    if (stud) {
      let tempdel: Student = await this.studentRepository.create(stud);
      let del = await this.studentRepository.delete(id);
      if ((await del).affected === 1) {
        return tempdel;
      }
    }
    throw new NotFoundException(`No student record by id ${id} can be found!`);
  }

  async bulkInsertStudents(students: any) {
    
  }
}
