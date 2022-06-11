import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { ErrorResponse } from "../dto/error-response.dto";
import {
  AuthorityRequiredException,
  InsufficientScopesException,
  InvalidContextException,
  InvalidRequestException,
  InvalidTokenException,
  PermissionRequiredException,
  ResourceNotFoundException,
  ServerTemporarilyUnavailableException,
  ServerTooBusyException,
} from "../exception/error.exception";
import { ValidationErrorException } from "../exception/validation-error.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = "";

    switch (true) {
      case exception instanceof InvalidContextException:
        // message = 'The request cannot be accepted this application type.';
        break;
      case exception instanceof InvalidRequestException:
        break;
      case exception instanceof ValidationErrorException:
        // const validationErrors: ValidationError[] = <ValidationError[]>(
        //   (<ValidationErrorException>exception).errors
        // );
        // const getErrorDetails = (validationErrorsArg: ValidationError[]) => {
        //   validationErrorsArg.forEach((validationError: ValidationError) => {
        //     for (const reason in validationError.constraints) {
        //       const detail: ErrorDetail = {
        //         error_code: error_code,
        //         field: validationError.property,
        //         reason: reason,
        //         message: validationError.constraints[reason],
        //       } as ErrorDetail;
        //       if (
        //         'contexts' in validationError &&
        //         reason in validationError.contexts
        //       ) {
        //         detail.reason = validationError.contexts[reason].reasonCode;
        //       }
        //       details.push(detail);
        //     }

        //     if (validationError.children) {
        //       getErrorDetails(validationError.children);
        //     }
        //   });
        // };

        // getErrorDetails(validationErrors);
        break;
      case exception instanceof UnauthorizedException:
      case exception instanceof InvalidTokenException:
        message =
          "The access token provided is expired, revoked, malformed or invalid for other reasons.";
        break;
      case exception instanceof InsufficientScopesException:
        message =
          "The request requires higher privileges than provided by the access token.";
        break;
      case exception instanceof PermissionRequiredException:
        message = "The request requires more permissions.";
        break;
      case exception instanceof AuthorityRequiredException:
        message = "The request requires higher authority.";
        break;
      case exception instanceof ResourceNotFoundException:
        break;
      case exception instanceof InternalServerErrorException:
        message = "Internal server error";
        break;
      case exception instanceof ServerTooBusyException:
        message =
          "Servers are too busy to handle your request. Please access after a while.";
        break;
      case exception instanceof ServerTemporarilyUnavailableException:
        message =
          "Servers are temporarily unable to handle your request. Please access after a while.";
        break;
      case exception instanceof NotFoundException:
        break;
      default:
        message = "Unknown error occured.";
        Logger.error({ message: exception });
    }

    const errorReponse: ErrorResponse = {
      statusCode: status,
      message,
    };

    response.status(status).json(errorReponse);
  }
}
