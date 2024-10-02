import '../components/homepage/homepage.css';

import Professors from '@/components/landing-page/professors';

export default async function HomePage() {
  return (
    <div className="min-h-screen items-center justify-center flex flex-col sm:p-24 p-3">
      <h1 className="capitalize font-poppins text-3xl mt-8">
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

      <Professors />
    </div>
  );
}
