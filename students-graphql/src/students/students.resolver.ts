import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => [Student], { name: 'getAllStudents' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: 'getStudentById' })
  findOne(@Args('studentId') studentId: string) {
    return this.studentsService.findOne(studentId);
  }

  @Mutation(() => Student, { name: 'createStudent' })
  create(@Args('createstudent') createstudent: CreateStudentInput) {
    return this.studentsService.create(createstudent);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  updateStudent(@Args('updatestudent') updatestudent: UpdateStudentInput) {
    return this.studentsService.update(updatestudent.studentId, updatestudent);
  }

  @Mutation(() => Student, { name: 'deleteStudent' })
  removeStudent(@Args('studentId') studentId: string) {
    return this.studentsService.remove(studentId);
  }
}
