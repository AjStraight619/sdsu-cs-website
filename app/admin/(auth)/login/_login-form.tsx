"use client"

import { LoginSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }
  })
}
