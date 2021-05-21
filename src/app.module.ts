import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { FileModule } from './files/file.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      // formatResponse,
      // formatError,
      uploads: false,
      playground: true,
    }),
    FileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
