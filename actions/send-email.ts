"use server"
import React from "react"
import VerificationEmail from "@/components/email/email"
import { getErrorMessage } from "@/lib/utils"
import { Resend } from "resend"
import { assert } from "console"
const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/api" : ""

const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendEmail = async (email: string, token: string, userId: string) => {
  assert(typeof email === 'string' && email.includes('@'), 'Invalid email format');
  assert(typeof token === 'string' && token.length > 0, 'Invalid token');

  const verificationUrl = `${baseUrl}/verify-email?token=${token}&userId=${userId}`
  let data;
  try {
    data = await resend.emails.send({
      from: "Verification Token ComputerScienceSDSU@gmail.com",
      to: email,
      subject: "Verification",
      react: React.createElement(VerificationEmail, {
        verificationUrl: verificationUrl,
        message: ""
      })
    })
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error)
    }
  }

}
