import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from 'express';

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  return app.getHttpAdapter().getInstance();
}

// Export the serverless function
export default bootstrap();
