import { fileImageUpload, fileSyllabusUpload } from '@/actions/files';
import { auth } from '@/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      console.log('Req: ', req);

      const session = await auth();

      if (!session) throw new UploadThingError('Unauthorized');

      const userId = session.user.id;

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      await fileImageUpload(metadata.userId, file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  syllabusUploader: f(['application/pdf'])
    .input(
      z.object({
        course: z.string(),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      console.log('Req: ', req);

      const session = await auth();

      if (!session) throw new UploadThingError('Unauthorized');

      //   const user = session?.user;

      const userId = session.user.id;
      const course = input.course;

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId, course };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      const { userId, course } = metadata;

      console.log('file url', file.url);

      await fileSyllabusUpload(userId, course, file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
