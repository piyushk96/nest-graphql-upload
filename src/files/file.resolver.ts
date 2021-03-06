import { createWriteStream } from 'fs';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  @Query(() => String, { name: 'test' })
  test() {
    return 'hi';
  }

  @Mutation(() => Boolean)
  async upload(@Args('file', { type: () => GraphQLUpload }) file: FileUpload) {
    const { filename, mimetype, encoding, createReadStream } = file;
    console.log('attachment:', filename, mimetype, encoding);

    const stream = createReadStream();

    return new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', (err) => {
          console.log(err);
          reject(false);
        });
    });
  }
}
