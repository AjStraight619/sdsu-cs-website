import { auth } from "@/auth"
export default async function NavWrapper() {
  const session = await auth()

  return (
    <nav>

    </nav>
  )
}
