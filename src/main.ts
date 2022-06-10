import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationErrorException } from "./common/exception/validation-error.exception";
import { HttpExceptionFilter } from "./common/exception-filters/exception.filter";
import { CustomLogger } from "./common/logger/logger.service";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationErrorException(validationErrors);
      },
    }),
  );
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT);
}
bootstrap();
