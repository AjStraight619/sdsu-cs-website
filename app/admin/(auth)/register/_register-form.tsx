'use client';
import { createUserFD } from '@/actions/user';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ErrorMessage, SuccessMessage } from '@/components/ui/form-messages';
import { Input } from '@/components/ui/input';

import { RegisterSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import SubmitButton2 from '@/components/ui/submit-button2';
import Link from 'next/link';

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const createUser = async (formData: FormData) => {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    if (!validatePassword(password, confirmPassword)) {
      setError('Passwords do not match');
      return;
    }
    const data = await createUserFD(form.getValues());
    console.log('Response data: ', data);
    if (data.error) {
      setError(data.error);
      return;
    } else if (data.user) {
      setSuccess('Email verification sent!');
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return false;
    return true;
  };

  return (
    <Card className="mx-auto w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          This form is restricted to SDSU CS professors.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}
        <Form {...form}>
          <form action={createUser} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="professor@sdsu.edu"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This email must match your official sdsu email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First name..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This will be the display name on your card.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last name..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This will be the display name on your card.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton2 className="w-full">Register</SubmitButton2>
          </form>
        </Form>
      </CardContent>
      <div className="mx-auto pb-2 w-full text-center">
        Have have an account?{' '}
        <Link
          className="text-red-500 hover:underline transition-transform duration-100"
          href="/admin/login"
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}
