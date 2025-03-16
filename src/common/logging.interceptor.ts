import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('before...');

    return next.handle().pipe(
      map((data) => ({
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
      })),
    );
  }
}
