import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from './customExeption';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorMessages = Array.isArray(exception.getResponse().message) ? exception.getResponse().message : [exception.getResponse().message];

    response.status(status).json({
      success: false,
      path: request.url,
      message: errorMessages
    });
  }
}