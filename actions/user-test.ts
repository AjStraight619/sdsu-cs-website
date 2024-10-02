// 'use server';
// import { z } from 'zod';
// import { RegisterSchema } from '@/lib/schemas';
// import { assert } from 'console';
// import { getUserByEmail } from '@/server-only/users';
// import { db } from '@/lib/db';
// import { hash } from 'bcrypt';
// import { nanoid } from 'nanoid';
// import { addHours } from 'date-fns';
// import { getError } from '@/lib/utils';

// export async function createUserTest(values: z.infer<typeof RegisterSchema>) {
//   console.log('values: ', values);

//   const validatedValues = RegisterSchema.safeParse(values);
//   if (!validatedValues.success) {
//     console.log('Yo something went wrong when parsing');
//     return;
//   }
//   console.log('validated values: ', validatedValues.data);

//   return {
//     message: 'yo',
//   };
// }

// export async function createUserTestFD(formData: FormData) {
//   const name = formData.get('name') as string;
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const isExistingUser = await getUserByEmail(email);
//   if (isExistingUser) {
//     return {
//       user: null,
//       error: 'User already exists',
//     };
//   }

//   const hashedPassword = await hash(password, 12);
//   try {
//     const newUser = await db.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     const verificationToken = nanoid();
//     const expiresAt = addHours(new Date(), 24);

//     await db.verificationToken.create({
//       data: {
//         token: verificationToken,
//         expiresAt,
//         userId: newUser.id,
//       },
//     });
//     return {
//       user: newUser,
//       error: null,
//     };
//   } catch (e) {
//     getError(e);
//     return;
//   }
// }
