'use server';

import { db } from '@/lib/db';
import { getError } from '@/lib/utils';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function fileImageUpload(userId: string, fileUrl: string) {
  let user: User | null;

  try {
    user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(e);
    } else if (typeof e === 'string') {
      console.log('');
    } else {
      throw e;
    }
    return;
  }

  if (!user) {
    console.log('User not found ');
  }

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: fileUrl,
      },
    });
  } catch (e) {
    getError(e);
    return;
  }
}

export async function fileSyllabusUpload(
  userId: string,
  courseName: string,
  fileUrl: string,
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  const course = await db.course.findUnique({
    where: {
      professorId_title: {
        professorId: userId,
        title: courseName,
      },
    },
  });

  if (!course) {
    console.log('No course');
    return;
  }

  try {
    await db.syllabus.upsert({
      where: {
        courseId: course.id, // This assumes that syllabus is tied to a course with a unique courseId
      },
      update: {
        url: fileUrl,
      },
      create: {
        courseId: course.id,
        url: fileUrl,
      },
    });
    console.log('Syllabus updated or created successfully');
  } catch (e) {
    getError(e);
  } finally {
    revalidatePath(`admin/dashboard/${userId}`);
  }
}
