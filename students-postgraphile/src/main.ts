import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import http from 'http';
import postgraphile from 'postgraphile';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    postgraphile(
      process.env.DATABASE_URL || "postgres://postgres:root123@localhost:5432/studentsdb",
      "public",
      {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
      }
    )
  );
  
  app.listen(process.env.PORT || 3500);
}
bootstrap();
