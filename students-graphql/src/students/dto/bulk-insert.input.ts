import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import JSON from 'graphql-type-json';

@InputType()
export class BulkInsertInput {
    @Field(() => JSON)
    jsonData: any
}