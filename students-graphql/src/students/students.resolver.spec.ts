import { BulkInsertInput } from './dto/bulk-insert.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';
import { v4 as uuidv4 } from 'uuid';


describe('StudentsResolver', () => {
  let resolver: StudentsResolver;

  const mockStudentService = {
    createStudent: jest.fn((createDto) => {
      return [
        ...students,
        {
          studentId: uuidv4(),
          age: expect.any(Number),
          ...createDto,
        },
      ];
    }),
    updateStudent: jest.fn((updateDto) => {
      return [
        {
          studentId: '7ed55b9d-d230-492f-a3aa-7cbeb2ffc574',
          firstName: 'aaa',
          lastName: 'bbb',
          email: 'aaabbb@gmail.com',
          grade: '9',
          division: 'C',
          dob: new Date('2005/10/12'),
          age: 15
        },
        {
          studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
          firstName: 'ccc',
          lastName: 'ddd',
          email: 'cccddd@gmail.com',
          grade: '9',
          division: 'A',
          dob: new Date('2005/10/12'),
          age: 15
        },
        {
          studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
          firstName: 'ggg',
          lastName: 'hhh',
          email: 'ggghhh@gmail.com',
          grade: '8',
          division: 'D',
          dob: new Date('2005/10/12'),
          age: 15
        },
      ];
    }),
    removeStudent: jest.fn((id) => {
      return {
        studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
        firstName: 'ccc',
        lastName: 'ddd',
        email: 'cccddd@gmail.com',
        grade: '9',
        division: 'A',
        dob: new Date('2005/10/12'),
        age: 15
      };
    }),
    findAllStudents: jest.fn(() => {
      return students;
    }),
    findOneStudent: jest.fn((id) => {
      return {
        studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
        firstName: 'ccc',
        lastName: 'ddd',
        email: 'cccddd@gmail.com',
        grade: '9',
        division: 'A',
        dob: new Date('2005/10/12'),
        age: 15
      }
    }),
    bulkInsertStudents: jest.fn((bulkInput) => {
      return {
        bulkInsert: 'success'
      }
    })
  }

  let students: Student[] = [
    {
      studentId: '7ed55b9d-d230-492f-a3aa-7cbeb2ffc574',
      firstName: 'aaa',
      lastName: 'bbb',
      email: 'aaabbb@gmail.com',
      grade: '9',
      division: 'C',
      dob: new Date('2005/10/12'),
      age: 15
    },
    {
      studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
      firstName: 'ccc',
      lastName: 'ddd',
      email: 'cccddd@gmail.com',
      grade: '9',
      division: 'A',
      dob: new Date('2005/10/12'),
      age: 15
    },
    {
      studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
      firstName: 'eee',
      lastName: 'fff',
      email: 'eeefff@gmail.com',
      grade: '8',
      division: 'C',
      dob: new Date('2005/10/12'),
      age: 15
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsResolver, StudentsService],
    })
      .overrideProvider(StudentsService)
      .useValue(mockStudentService)
      .compile();

    resolver = module.get<StudentsResolver>(StudentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a student', () => {
    const createStudentInput: CreateStudentInput = {
      firstName: 'testfname',
      lastName: 'testlname',
      email: 'test@gmail.com',
      grade: '10',
      division: 'A',
      dob: new Date('2005/10/12'),
    };
    expect(resolver.create(createStudentInput)).toEqual([
      ...students,
      {
        studentId: expect.any(String),
        age: expect.any(Number),
        ...createStudentInput,
      },
    ]);
    expect(mockStudentService.createStudent).toHaveBeenCalledWith(createStudentInput); 
  });

  it('should update a student', () => {
    const updateStudentInput: UpdateStudentInput = {
      studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
      firstName: 'ggg',
      lastName: 'hhh',
      email: 'ggghhh@gmail.com',
      grade: '8',
      division: 'D',
      dob: new Date('2005/10/12'),
    };
    expect(resolver.updateStudent(updateStudentInput)).toEqual([
      {
        studentId: '7ed55b9d-d230-492f-a3aa-7cbeb2ffc574',
        firstName: 'aaa',
        lastName: 'bbb',
        email: 'aaabbb@gmail.com',
        grade: '9',
        division: 'C',
        dob: new Date('2005/10/12'),
        age: 15
      },
      {
        studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
        firstName: 'ccc',
        lastName: 'ddd',
        email: 'cccddd@gmail.com',
        grade: '9',
        division: 'A',
        dob: new Date('2005/10/12'),
        age: 15
      },
      {
        studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
        firstName: 'ggg',
        lastName: 'hhh',
        email: 'ggghhh@gmail.com',
        grade: '8',
        division: 'D',
        dob: new Date('2005/10/12'),
        age: 15
      },
    ]);

    expect(mockStudentService.updateStudent).toHaveBeenCalledWith(
      updateStudentInput.studentId,
      updateStudentInput,
    );
  });

  it('should delete a student', () => {
    const studentId: string = 'c8546dc6-d977-4557-bda9-a95582010c66';
    expect(
      resolver.removeStudent(studentId),
    ).toEqual({
      studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
      firstName: 'ccc',
      lastName: 'ddd',
      email: 'cccddd@gmail.com',
      grade: '9',
      division: 'A',
      dob: new Date('2005/10/12'),
      age: 15
    });
    expect(mockStudentService.removeStudent).toHaveBeenCalledWith(
      studentId,
    );
  });

  it('should find all students', () => {
    expect(resolver.findAll()).toEqual(students); 
    expect(mockStudentService.findAllStudents).toHaveBeenCalled();  
  });

  it('should find one student', () => {
    const studentId: string = 'c8546dc6-d977-4557-bda9-a95582010c66';
    expect(resolver.findOne(studentId)).toEqual(
      {
        studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
        firstName: 'ccc',
        lastName: 'ddd',
        email: 'cccddd@gmail.com',
        grade: '9',
        division: 'A',
        dob: new Date('2005/10/12'),
        age: 15
      }
    )
    expect(mockStudentService.findOneStudent).toHaveBeenCalledWith(studentId); 
  });

  it('should bulk insert array of students', () => {
    const studentsBulk: BulkInsertInput = {
      jsonData: [
        {
          studentId: '7ed55b9d-d230-492f-a3aa-7cbeb2ffc574',
          firstName: 'aaa',
          lastName: 'bbb',
          email: 'aaabbb@gmail.com',
          grade: '9',
          division: 'C',
          dob: new Date('2005/10/12'),
          age: 15
        },
        {
          studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
          firstName: 'ccc',
          lastName: 'ddd',
          email: 'cccddd@gmail.com',
          grade: '9',
          division: 'A',
          dob: new Date('2005/10/12'),
          age: 15
        },
        {
          studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
          firstName: 'eee',
          lastName: 'fff',
          email: 'eeefff@gmail.com',
          grade: '8',
          division: 'C',
          dob: new Date('2005/10/12'),
          age: 15
        },
      ]
    }

    expect(resolver.bulkInsert(studentsBulk)).toEqual(
      {
        bulkInsert: 'success'
      }
    )
    expect(mockStudentService.bulkInsertStudents).toHaveBeenCalledWith(studentsBulk.jsonData);

  })

});
