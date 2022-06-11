import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationErrorException } from "./common/exception/validation-error.exception";
import { HttpExceptionFilter } from "./common/exception-filters/exception.filter";
import { CustomLogger } from "./common/logger/logger.service";
import { Config } from "./configs/common";
import { SocketAdapter } from "./gateways/socket/adapters/socket.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useWebSocketAdapter(new SocketAdapter(app));
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

  await app.listen(Config.APP_PORT, () => {
    Logger.log(`Nest application started on port: ${Config.APP_PORT}`);
  });
}
bootstrap();
