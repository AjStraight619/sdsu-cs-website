import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { Button } from "@react-email/components"
import { MailCheckIcon, MailXIcon } from "lucide-react"
import Link from "next/link"

type VerifyEmailPageProps = {
	searchParams: { [key: string]: string | string[] | undefined }
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
	let message = "Verifying email..."
	let verified = false

	if (searchParams.token) {
		const tokenRecord = await db.verificationToken.findUnique({
			where: {
				token: searchParams.token as string,
			},
			include: {
				user: true,
			},
		})

		if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
			message = "Invalid or expired token."
		} else {
			await db.$transaction([
				db.user.update({
					where: {
						id: tokenRecord.userId,
					},
					data: {
						emailVerified: new Date(),
					},
				}),
				db.verificationToken.delete({
					where: {
						token: searchParams.token as string,
					},
				}),
			])

			message = "Email verified successfully!"
			verified = true
		}
	} else {
		message = "No token provided."
	}

	return (
		<Card className="max-w-sm text-center">
			<CardHeader>
				<CardTitle>
					Email Verification
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='w-full grid place-content-center py-4'>
					{verified ? <MailCheckIcon size={56} /> : <MailXIcon size={56} />}

				</div>
				<p className="text-lg text-muted-foreground">
				</p>
			</CardContent>
			<CardFooter>
				{verified && (
					<Link href="/admin/login" className="bg-primary text-white text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 rounded-lg w-full text-center">
						Log in
					</Link>
				)}
			</CardFooter>
		</Card>
	)
}


