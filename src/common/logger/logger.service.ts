import { Injectable, LoggerService, Scope } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { Logger } from "log4js";
import { basename } from "path";
import * as util from "util";

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  private static readonly DEFAULT_LOGGER_JS_PATH =
    "@nestjs/common/services/logger.service.js";

  constructor(private readonly logger: Logger) {}

  setRequestInfo(req: Request) {
    this.logger.addContext("req.ip", req.ip);
    this.logger.addContext("req.method", req.method);
    this.logger.addContext("req.url", req.url);

    this.logger.addContext("req.userAgent", req.headers["user-agent"]);
    this.logger.addContext("req.xForwardedFor", req.headers["x-forwarded-for"]);
  }

  log(message: any, ...optionalParams: any[]) {
    this.setData(message, ...optionalParams);
    this.setStack(this.log);
    this.logger.info(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    this.setData(message, ...optionalParams);
    this.setStack(this.error);
    this.logger.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.setData(message, ...optionalParams);
    this.setStack(this.warn);
    this.logger.warn(message, ...optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    this.setData(message, ...optionalParams);
    this.setStack(this.debug);
    this.logger.debug(message, ...optionalParams);
  }

  private setData(...args: any[]) {
    const lines = util.format(...args);

    const idx = lines.indexOf("\n");
    const line0 = idx === -1 ? lines : lines.slice(0, idx);

    this.logger.addContext("data.lines", lines);
    this.logger.addContext("data.line0", line0);
  }

  private setStack(caller?: NextFunction) {
    const stack = this.getTrace(caller);
    this.logger.addContext("file", stack.file);
    this.logger.addContext("line", stack.line);
    this.logger.addContext("column", stack.column);
    this.logger.addContext("function", stack.func);
  }

  private prepareStackTrace(_error: Error, stackTraces: NodeJS.CallSite[]) {
    const trace =
      stackTraces.find(
        (x) => !x.getFileName().endsWith(CustomLogger.DEFAULT_LOGGER_JS_PATH),
      ) ?? stackTraces[0];
    return {
      // method name
      func: trace.getMethodName() || trace.getFunctionName() || "<anonymous>",
      // file name
      file: basename(trace.getFileName()),
      // line number
      line: trace.getLineNumber(),
      // column number
      column: trace.getColumnNumber(),
    };
  }

  private getTrace(caller?: NextFunction) {
    const original = Error.prepareStackTrace;
    const error = { stack: { func: "", file: "", line: 0, column: 0 } };
    Error.captureStackTrace(error, caller || this.getTrace);
    Error.prepareStackTrace = this.prepareStackTrace;
    const stack = error.stack;
    Error.prepareStackTrace = original;
    return stack;
  }
}
