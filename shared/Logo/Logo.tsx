import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/dashboard">
      <Image
        alt="icecreammusic"
        src="/assets/logo.png"
        width={60}
        height={60}
      />
    </Link>
  );
};

export default Logo;
