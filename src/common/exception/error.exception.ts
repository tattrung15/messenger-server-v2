import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ServiceUnavailableException,
  ValidationError,
} from "@nestjs/common";

/*********************************************************************
  400 BadRequestException
*********************************************************************/

export class InvalidContextException extends BadRequestException {}

export class InvalidRequestException extends BadRequestException {}

export class ValidationErrorException extends BadRequestException {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super(errors);
    this.errors = errors;
  }
}

/*********************************************************************
  401 UnauthorizedException
*********************************************************************/

export class InvalidTokenException extends UnauthorizedException {}

/*********************************************************************
  403 ForbiddenException
*********************************************************************/
export class InsufficientScopesException extends ForbiddenException {}

export class PermissionRequiredException extends ForbiddenException {}

export class AuthorityRequiredException extends ForbiddenException {}

/*********************************************************************
  404 NotFoundException
*********************************************************************/
export class ResourceNotFoundException extends NotFoundException {}

/*********************************************************************
  503 ServiceUnavailableException
*********************************************************************/
export class ServerTooBusyException extends ServiceUnavailableException {}

export class ServerTemporarilyUnavailableException extends ServiceUnavailableException {}
