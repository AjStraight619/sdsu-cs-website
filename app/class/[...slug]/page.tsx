type ClassPageProps = {
  params: {
    slug: string[];
  };
};

export default async function ClassPage({ params: { slug } }: ClassPageProps) {
  const [classCode, ...otherRoutes] = slug;

  // Do fetching here based on classcode and other routes

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Class: {classCode}</h1>
      {otherRoutes.length > 0 && (
        <p>Additional Route Info: {otherRoutes.join("/")}</p>
      )}
    </div>
  );
}
