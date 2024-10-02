'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { ProfileSchema } from '@/lib/schemas';
import { getError, getS3FileURL } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

// ! TODO: Fix this to use zod form validator

export async function updateProfileCard(data: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return { failure: 'Not authenticated' };
  }
  const formData = Object.fromEntries(data);
  const parsedData = ProfileSchema.safeParse(formData);

  // if (!parsedData.success) {
  //   console.log("Not a successful parse...");
  //   return { failure: "Invalid data format" };
  // }

  // const fileUrl = getS3FileURL("profile-image", session.user.id);
  // console.log("fileUrl: ", fileUrl);

  const userId = session?.user?.id;

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        firstName: formData.firstName as string,
        // image: fileUrl,
        lastName: formData.lastName as string,
        bio: formData.bio as string,
      },
    });

    console.log('updated profile');

    return {
      success: 'Successfully updated profile.',
    };
  } catch (err) {
    getError(err);
    return { failure: 'Failed to update profile.' };
  } finally {
    revalidatePath(`/admin/dashboard/${userId}`);
  }
}
