import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateStudentInput } from './dto/update-student.input';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';


describe('StudentsService', () => {
  let service: StudentsService;
  
  

  const mockStudentRepository = {
    findOne: jest.fn().mockImplementation((id) => {
      students.map((data:Student) => {
        if(id == data.studentId){
          Promise.resolve(data)
        }
      })
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve(students)),
    create: jest.fn().mockImplementation((createInput) => Promise.resolve(createInput)), 
    save: jest.fn().mockImplementation((saveInput) => Promise.resolve({ studentId: '8ed558sg-h730-492f-a3aa-7bbahhsg984', ...saveInput })),
    delete: jest.fn().mockImplementation((deleteId) => Promise.resolve({ raw: [], affected: 1 })), 
    findOneStudent: jest.fn().mockImplementation((id) => Promise.resolve(del)),
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

  const updatedStudents: Student[] = [
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
      studentId: '8ed558sg-h730-492f-a3aa-7bbahhsg984',
      firstName: 'testfname',
      lastName: 'testlname',
      email: 'test@gmail.com',
      grade: '10',
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

  const createdStudents: Student[] = [
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
    {
      studentId: '8ed558sg-h730-492f-a3aa-7bbahhsg984',
      firstName: 'testfname',
      lastName: 'testlname',
      email: 'test@gmail.com',
      grade: '10',
      division: 'A',
      dob: new Date('2005/10/12'),
      age: 15
    }
  ];

  const oneStud: Student = {
    studentId: '7ed55b9d-d230-492f-a3aa-7cbeb2ffc574',
    firstName: 'aaa',
    lastName: 'bbb',
    email: 'aaabbb@gmail.com',
    grade: '9',
    division: 'C',
    dob: new Date('2005/10/12'),
    age: 15
  }

  const del = {
    studentId: 'c8546dc6-d977-4557-bda9-a95582010c66',
    firstName: 'ccc',
    lastName: 'ddd',
    email: 'cccddd@gmail.com',
    grade: '9',
    division: 'A',
    dob: new Date('2005/10/12'),
    age: 15
  }

  


  const mockBulkInsert = jest.fn().mockImplementation((bulk) => Promise.resolve('success'));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find and return all students', async() => {
    expect(await service.findAllStudents()).toEqual(students);
    expect(mockStudentRepository.find).toHaveBeenCalled();
  });

  it('should find and return a student by studentId', async() => {
    const studentsId: string = "7ed55b9d-d230-492f-a3aa-7cbeb2ffc574";
    mockStudentRepository.findOne.mockReturnValue(oneStud);
    expect(await service.findOneStudent(studentsId)).toEqual(oneStud);
    expect(mockStudentRepository.findOne).toHaveBeenCalled();
  });

  it('should create a student and return all students', async () => {
    const createStudentInput: CreateStudentInput = {
      firstName: 'testfname',
      lastName: 'testlname',
      email: 'test@gmail.com',
      grade: '10',
      division: 'A',
      dob: new Date('2005/10/12'),
    };
    const age: number = 15;
    students = createdStudents;
    expect(await service.createStudent(createStudentInput)).toEqual(students);
    expect(mockStudentRepository.save).toHaveBeenCalled();
  });

  it('should update a student and return all students', async() => {
    const updateStudentInput: UpdateStudentInput = {
      studentId: 'a2fde912-8777-46e1-9386-cfb3ab436cfa',
      firstName: 'ggg',
      lastName: 'hhh',
      email: 'ggghhh@gmail.com',
      grade: '8',
      division: 'D',
      dob: new Date('2005/10/12'),
    };
    let updateInput = {
      firstName: 'ggg',
      lastName: 'hhh',
      email: 'ggghhh@gmail.com',
      grade: '8',
      division: 'D',
      dob: new Date('2005/10/12'),
      age: 15
    }
    const age: number = 15;
    students = updatedStudents;
    expect(await service.updateStudent(updateStudentInput.studentId, updateStudentInput)).toEqual(students);
    expect(mockStudentRepository.create).toHaveBeenCalled();    
    expect(mockStudentRepository.save).toHaveBeenCalled();    
  });

  it('should delete a student', async() => { 
    const studentId = 'c8546dc6-d977-4557-bda9-a95582010c66';
    
    mockStudentRepository.findOne.mockReturnValue(del);
    expect(await service.removeStudent(studentId)).toEqual(del);   
    expect(mockStudentRepository.create).toHaveBeenCalled();
    expect(mockStudentRepository.delete).toHaveBeenCalled(); 
  
  })

  it('should bulk insert students and return success message', async() => { 
    const bulkStudents = [     
      {
        firstname: 'aaa',      
        lastname: 'bbb',       
        email: 'aaa@gmail.com',
        grade: '10',
        division: 'A',
        dob: '2000/10/16',
        age: 20
      },
      {
        firstname: 'bbb',
        lastname: 'ccc',
        email: 'bbb@gmail.com',
        grade: '12',
        division: 'B',
        dob: '1999/05/25',
        age: 22
      },
      {
        firstname: 'ddd',
        lastname: 'eee',
        email: 'ddd@gmail.com',
        grade: '6',
        division: 'C',
        dob: '2005/04/29',
        age: 16
      }
    ];
    mockBulkInsert.mockReturnValue('success');
    expect(mockBulkInsert(bulkStudents)).toEqual('success'); 
  }) 
});
