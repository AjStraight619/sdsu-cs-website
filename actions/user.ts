'use server';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/lib/schemas';
import { z } from 'zod';
import { hash } from 'bcryptjs';
// import { getErrorMessage } from "@/lib/utils";
import { getUserByEmail } from '@/server-only/users';
import { nanoid } from 'nanoid';
import { addHours } from 'date-fns';
import { sendEmail } from './send-email';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { getError } from '@/lib/utils';

const EMAILS = process.env.VALID_EMAILS!;

// export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
//   const validatedValues = RegisterSchema.safeParse(values);

//   if (!validatedValues.success) {
//     return {
//       success: false,
//       data: null,
//       error: {
//         message: 'Something went wrong',
//       },
//     };
//   }

//   const { firstName, lastName, email, password } = validatedValues.data;
//   const hashedPassword = await hash(password, 12);

//   try {
//     const newUser = await db.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     console.log('new user: ', newUser);

//     //
//     // const verificationToken = nanoid();
//     // const expiresAt = addHours(new Date(), 24);

//     //   data: {
//     //     token: verificationTokenR
//     //     userId: newUser.id,
//     //     expiresAt,
//     //   }
//     // });

//     /*    await sendEmail(newUser.email, verificationToken, newUser.id); */

//     return {
//       success: true,
//       data: newUser,
//       error: null,
//     };
//   } catch (e) {
//     getError(e);
//     return {
//       success: false,
//       data: null,
//       error: {
//         message: 'Error creating new user',
//       },
//     };
//   }
// };

export async function createUserFD(values: z.infer<typeof RegisterSchema>) {
  // const name = formData.get('name') as string;
  // const email = formData.get('email') as string;
  // const password = formData.get('password') as string;

  const parsedValues = RegisterSchema.safeParse(values);

  if (parsedValues.error) {
    return {
      error: 'Something wrong with form values',
    };
  }

  const { firstName, lastName, email, password } = parsedValues.data;

  const splitEmails = EMAILS.split(':').map(email => email.toLowerCase());

  if (!splitEmails.includes(email.toLowerCase())) {
    return {
      user: null,
      error:
        'This email is not in our system, please contact the administrator.',
    };
  }

  // if (!firstName  || !email || !password) {
  //   console.error('Form data is incomplete');
  //   return {
  //     user: null,
  //     error: 'Form data is incomplete',
  //   };
  // }

  try {
    // Run the check for existing user and password hashing in parallel
    const [existingUser, hashedPassword] = await Promise.all([
      getUserByEmail(email),
      hash(password, 12),
    ]);

    if (existingUser?.id && existingUser?.emailVerified) {
      return {
        user: null,
        error: 'User already exists',
      };
    }

    // Create a new user
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = nanoid();
    const expiresAt = addHours(new Date(), 24);

    // Create verification token and send email in parallel
    await Promise.all([
      db.verificationToken.create({
        data: {
          token: verificationToken,
          userId: newUser.id,
          expiresAt,
        },
      }),
      sendEmail(newUser.email, verificationToken, newUser.id),
    ]);

    console.log('New user created: ', newUser);
    return {
      user: newUser,
      error: null,
    };
  } catch (e) {
    getError(e);
    return {
      user: null,
      error: 'An error occurred while processing the request',
    };
  }
}

export const login = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  await signIn('credentials', { email, password });
  revalidatePath('/admin/login', 'page');
};
