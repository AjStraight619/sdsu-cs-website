'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { getError, getS3FileURL } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addSyllabus(data: FormData) {
  const session = await auth();
  if (!session || !session.user.id) {
    return { failure: 'Not authenticated' };
  }

  const userId = session.user.id;

  const formData = Object.fromEntries(data.entries());
  const title = (formData.title as string) || null;
  const description = (formData.description as string) || null;
  const courseTitle = formData.courseTitle as string;
  console.log('course title: ', courseTitle);

  const professorId = session.user.id;

  try {
    const course = await db.course.findFirst({
      where: {
        professorId: professorId,
        title: courseTitle,
      },
    });

    if (!course) {
      return { failure: 'Course not found' };
    }

    const courseId = course.id;
    const fileUrl = getS3FileURL('syllabus', session.user.id);

    const existingSyllabus = await db.syllabus.findUnique({
      where: {
        courseId: courseId,
      },
    });

    let result;
    if (existingSyllabus) {
      result = await db.syllabus.update({
        where: {
          id: existingSyllabus.id,
        },
        data: {
          title: title ?? '',
          description: description ?? '',
          url: fileUrl,
        },
      });
    } else {
      result = await db.syllabus.create({
        data: {
          courseId: courseId,
          title: title ?? '',
          description: description ?? '',
          url: fileUrl,
        },
      });
    }

    console.log('result: ', result);

    return {
      success: 'Upload successful!',
    };
  } catch (err) {
    getError(err);
    return { failure: 'Error adding syllabus' };
  } finally {
    revalidatePath(`/admin/dashboard/${userId}`);
  }
}
