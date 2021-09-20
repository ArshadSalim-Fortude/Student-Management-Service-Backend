import { ObjectType, Field, Int } from "@nestjs/graphql"

@ObjectType()
export class ExcelUpload {
    @Field()
    studentId: string

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    email: string

    @Field()
    grade: string

    @Field()
    division: string

    @Field()
    dob: Date

    @Field(() => Int)
    age: number


}
