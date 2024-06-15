"use client";
import { createUserFD } from "@/actions/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ErrorMessage, SuccessMessage } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";

import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import SubmitButton2 from "@/components/ui/submit-button2";
import { createUserTest } from "@/actions/test";

export default function RegisterForm() {

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  // const { push } = useRouter()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    }
  })

  // const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  //   setError("");
  //   setSuccess("");
  //   startTransition(() => {
  //     createUserTest(values).then((data) => {
  //       console.log("data from server action: ", data)
  //     })
  //   })
  // };

  // const createUserClient = async (formData: FormData) => {
  //   const name = formData.get("name")

  //   const email = formData.get("email")

  //   console.log(name, email)

  // }

  const createUser = async (formData: FormData) => {
    const data = await createUserFD(formData);
    console.log("Response data: ", data);
    if (data.error) {
      setError(data.error);
      return;
    } else if (data.user) {
      setSuccess("Email verification sent!");
    }
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Register
        </CardTitle>
        <CardDescription>
          This form is restricted to SDSU CS professors.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {error && (
          <ErrorMessage message={error} />
        )}
        {success && (
          <SuccessMessage message={success} />
        )}
        <Form {...form}>
          <form action={createUser} className='space-y-4'>
            <FormField name='email' control={form.control} render={({ field }) => (

              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input type='email' placeholder="professor@sdsu.edu" {...field} />
                </FormControl>
                <FormDescription>
                  This email must match your official sdsu email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name='name' control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name
                </FormLabel>
                <FormControl>
                  <Input type='text' placeholder="Name..." {...field} />
                </FormControl>
                <FormDescription>
                  This will be the display name on your card.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name='password' control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <Input type='password' placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name='confirmPassword' control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type='password' placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <SubmitButton2>
              Register
            </SubmitButton2>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
