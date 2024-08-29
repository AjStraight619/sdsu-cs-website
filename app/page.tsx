import { auth } from "@/auth";
import { db } from "@/lib/db";
import ClassList from "../components/homepage/ClassList";
import "../components/homepage/homepage.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Professors from "@/components/landing-page/professors";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen items-center justify-center flex flex-col">
      <h1 className="capitalize font-poppins text-3xl pt-12">
        CS Course Repository
      </h1>

      <section className="welcome-section">
        <h2 className="capitalize font-poppins text-center">
          Welcome Students!
        </h2>
        <p className="text-center px-20 py-1">
          This is the SDSU Computer Science Repository! It is designed to
          provide you with all the resources and information you need for your
          Computer Science courses at SDSU.
        </p>
        <p className="text-center px-20 py-1">
          Explore the classes below to access syllabi, lecture notes,
          assignments, and more. Happy learning!
        </p>
      </section>

      {/* <Card className="px-10 py-10">
        <CardContent>
          <ClassList professors={professors} />
        </CardContent>
      </Card> */}
      <Professors />
    </div>
  );
}
