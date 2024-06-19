import Link from "next/link";

export default function Logo() {
  return (
    <div className="font-poppins font-medium text-xl self-center">
      <Link href="/">
        <span className="text-bright-red">SDSU</span>{" "}
        <span className="text-charcoal-950">CS</span>
      </Link>
    </div>
  );
}
