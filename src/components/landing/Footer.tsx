import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl flex justify-between gap-10 px-6 py-12">
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo.svg"
            alt="DadaChat logo"
            width={136}
            height={28}
            className="grayscale"
          />
          <div className="">
            <dl className="flex items-center gap-2 text-sm text-gray-400">
              <dt>Email: </dt>
              <dd className="text-gray-600">dada4dev@gmail.com</dd>
            </dl>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025-2026 DadaChat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
