import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ErrorResponse } from "../dto/error-response.dto";
import { ResourceNotFoundException } from "../exception/error.exception";
import { ValidationErrorException } from "../exception/validation-error.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = "";

    switch (true) {
      case exception instanceof ValidationErrorException:
        // const validationErrors1: ValidationError[] = <ValidationError[]>(
        //   (<ValidationErrorException>exception).errors
        // );
        break;
      case exception instanceof ResourceNotFoundException:
        break;
    }

    const errorReponse: ErrorResponse = {
      statusCode: status,
      message,
    };

    response.status(status).json(errorReponse);
  }
}
