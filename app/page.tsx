import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function HomePage() {
	// const user = await db.user.findUnique({
	// 	where: {
	// 		email: "test@user.com"
	// 	}
	// })
	const session = await auth()

	return (
		<div className="min-h-screen items-center justify-center flex flex-col">
			<pre>

				{JSON.stringify(session, null, 2)}
			</pre>

		</div>
	)
}
