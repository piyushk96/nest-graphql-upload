import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  catch(exception: any) {
    // Error handlers for different errors

    if (exception.status) {
      return new HttpException(
        HttpException.createBody(
          {
            statusCode: exception.status,
            message: exception.message,
          },
          exception.name,
          exception.status,
        ),
        exception.status,
      );
    }

    if (exception.statusCode === 500) {
      Logger.error({ err: exception }, 'Unexpected Error');
      return new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unexpected error occured',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return exception;
  }
}
