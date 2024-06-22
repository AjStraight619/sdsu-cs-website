import { auth } from '@/auth'
import { db } from '@/lib/db'
import ClassList from '../components/homepage/ClassList'
import '../components/homepage/homepage.css'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
export default async function HomePage() {
  // const user = await db.user.findUnique({
  // 	where: {
  // 		email: "test@user.com"
  // 	}
  // })
  const session = await auth()

  return (
    <div className="min-h-screen items-center justify-center flex flex-col">
      <h1 className="capitalize font-poppins text-3xl pt-10">
        CS Course Repository
      </h1>

      <section className="welcome-section">
        <h2 className="capitalize font-poppins text-center pb-5">
          Welcome Students!
        </h2>
        <p>
          Welcome to the Computer Science Repository! This repository is
          designed to provide you with all the resources and information you
          need for your Computer Science courses at SDSU.
        </p>
        <p>
          Explore the classes below to access syllabi, lecture notes,
          assignments, and more. Happy learning!
        </p>
      </section>

      <Card className="px-10 py-10">
        <CardContent>
          <ClassList />
        </CardContent>
      </Card>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
