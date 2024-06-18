import Image from "next/image"

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="rounded-full p-1 bg-white">
      <Image alt="Profile Image" src={imageUrl} height={80} width={80} className="rounded-full w-24 h-24 object-fill" quality={100} />
    </div>
  )
}
