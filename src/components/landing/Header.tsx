import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";
import { NAVIGATION } from "@/constants/navigation";

export function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
        <div className="">
          <Link href={"/landing"}>
            <Image
              src="/images/logo.svg"
              alt="DadaChat logo"
              width={160}
              height={36}
            />
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href={NAVIGATION.SIGNIN}>
            <Button size="md" variant="dark">
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
