"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ErrorMessage, SuccessMessage } from "@/components/ui/form-messages";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {

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
          <form className='space-y-4'>
            <FormField name='email' control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="professor@sdsu.edu" {...field} />
                </FormControl>
                <FormDescription>
                  This email must match your official sdsu email.
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
                  <Input placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
