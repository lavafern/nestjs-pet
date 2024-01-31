import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface FailedResponse {
  success: boolean
  path: any
  message: string
  data: null;
}

@Injectable()
export class ErrorInterceptor<T> implements NestInterceptor<T, FailedResponse> {

    errorHandler(exception: HttpException, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        
        response.status.json({
            success: false,
            path: request.url,
            message: exception.message,
            data: null
        });
    }
    
  intercept(context: ExecutionContext, next: CallHandler): Observable<FailedResponse> {
        return next.handle().pipe(
          catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
        );
    }

}