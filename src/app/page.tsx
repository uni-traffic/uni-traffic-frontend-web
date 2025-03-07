"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col relative w-screen h-screen">
      <div className="flex flex-row max-w-auto h-24 bg-white items-center p-8">
        <span className="text-black blur-none">Header</span>
      </div>
      <div className="flex items-center justify-center relative top-0 left-0 w-full h-full">
        <Image
          src="/neu-camp-1.png"
          alt="neu-campus-background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="flex flex-col gap-y-12 items-center justify-center h-1/2 w-1/2 z-10">
          <Image
            src="/image.png"
            alt="neu-campus-background"
            width={300}
            height={300}
            objectFit="cover"
            quality={100}
          />
          <Button
            variant="outline"
            size="lg"
            className="bg-black border-black text-white w-1/4 hover:bg-gray-800 hover:text-white "
            onClick={() => router.push("/auth/login")}
          >
            Get Started
          </Button>
          <div className="w-3/4">
            <p className="text-center font-semibold">
              UniTraffic ensures hassle-free vehicle entry at New Era University by verifying
              sticker registration and tracking violations with a quick scan.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-65 -z-10" />
        </div>
      </div>
    </div>
  );
}
