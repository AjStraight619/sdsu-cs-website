import Header from "@/components/class-page/header";

type ClassPageProps = {
  params: {
    slug: string[];
  };
};

export default async function ClassPage({ params: { slug } }: ClassPageProps) {
  const [classCode, ...otherRoutes] = slug;

  console.log("slug: ", slug);

  // ? Fetch data based on params

  return (
    <div className="h-screen flex flex-col items-center pt-24">
      <Header>Class: {classCode.split("-").join(" ")}</Header>
      {otherRoutes.length > 0 && <p>Other routes {otherRoutes.join("/")}</p>}
    </div>
  );
}
