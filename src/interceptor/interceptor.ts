import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SuccessResponse<T> {
  asu: boolean
  path: any
  data: T;
}
export interface FailedResponse {
  success: boolean
  path: any
  message: string
  data: null;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponse<T>> {

    responseHandler<R>(res: R, context: ExecutionContext) : SuccessResponse<R> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        return {
            asu: true,
            path: request.url,
            data: res
        };

    }
    
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse<T>> {
        return next.handle().pipe(
          map((res: T) => this.responseHandler(res, context)),
        );
    }

}