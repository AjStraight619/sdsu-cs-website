import Courses from "@/components/landing-page/courses";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24 gap-y-8">
			<Header />
			{/* <Courses /> */}
		</div>
	);
}
