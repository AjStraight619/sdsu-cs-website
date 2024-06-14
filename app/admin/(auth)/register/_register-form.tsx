"use client";
import { createUser } from "@/actions/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ErrorMessage, SuccessMessage } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { push } = useRouter()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    }
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      createUser(values).then((data) => {
        if (!data.success && data.error && typeof data.error.message === 'string') {
          setError(data.error.message)
          return
        }
        if (data.success && data.success.data) {
          setSuccess("Email verification sent")
        }
      })
    })
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Register
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {error && (
          <ErrorMessage message={error} />
        )}
        {success && (
          <SuccessMessage message={success} />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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

            <SubmitButton isPending={isPending}>
              Register
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
