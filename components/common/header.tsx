export type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`font-poppins text-4xl ${className}`}>
      <span className="text-red-500">SDSU </span>
      <span>Computer Science</span>
    </header>
  );
}
