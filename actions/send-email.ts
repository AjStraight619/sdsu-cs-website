"use server"
import React from "react"
import VerificationEmail from "@/components/email/email"
import { getErrorMessage } from "@/lib/utils"
import { Resend } from "resend"
import { assert } from "console"
const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/admin/verify-email" : "https://sdsu-cs.com/admin/verify-email"
// TODO: Test prod api key
const devEnv = process.env.NODE_ENV === 'development'
const resend = new Resend(process.env.RESEND_API_KEY_PROD!)

console.log(process.env.RESEND_API_KEY_PROD!)

export const sendEmail = async (email: string, token: string, userId: string) => {
  // assert(typeof email === 'string' && email.includes('@'), 'Invalid email format');
  // assert(typeof token === 'string' && token.length > 0, 'Invalid token');

  const verificationUrl = `${baseUrl}?token=${token}&userId=${userId}`
  let data;
  try {
    data = await resend.emails.send({
      from: "no-reply@sdsu-cs.com",
      to: email,
      subject: "Verification",
      react: React.createElement(VerificationEmail, {
        verificationUrl: verificationUrl,
        message: ""
      })
    })
    console.log("data: ", data)
  } catch (error) {
    console.error("error: ", error)
    return {
      data: null,
      error: getErrorMessage(error)
    }
  }

}
