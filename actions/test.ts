"use server"

export async function createUserTest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log("Name: ", name, "Email: ", email, "Password: ", password)

  const user = {
    name,
    email,
    password,

  }

  return {
    user: user,
    error: null
  }
}
