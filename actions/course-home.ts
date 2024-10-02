'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addCourseDescription(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    return { failure: 'Not authenticated' };
  }

  const userId = session.user.id;
  const courseDescription = formData.get('courseDescription') as string;
  const courseName = formData.get('courseName') as string;

  try {
    await db.course.update({
      where: {
        professorId_title: {
          professorId: session.user.id,
          title: courseName,
        },
      },
      data: {
        description: courseDescription,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating course description:', error);
    return { failure: 'Error updating course description' };
  } finally {
    revalidatePath(`/admin/dashboard/${userId}`);
  }
}
