"use client";
import { signIn } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton2 from "@/components/ui/submit-button2";
import { LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "@/actions/user";
import { SignOut } from "@/components/ui/sign-out-button";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Log in to see your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-8">
          <Form {...form}>
            <form className="space-y-6" action={login}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="professor@sdsu.edu"
                      />
                    </FormControl>
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
                      <Input
                        type="password"
                        {...field}
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton2 className="w-full">Log In</SubmitButton2>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
