"use client";

import { RedirectToDashboard } from "@/components/auth/RedirectToDashboard";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <RedirectToDashboard>
      <div className="w-screen h-screen bg-[url('/neuCampusBlurred.png')] overflow-hidden bg-cover bg-center bg-no-repeat ] flex flex-col">
        <Header />
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-y-20 text-center">
            <div className="bg-[url('/uniTrafficLogo.png')] bg-cover bg-center bg-no-repeat w-[300px] h-[189px]" />
            <Button className="w-[12vw] min-w-[129px]" asChild>
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <p className="max-w-[600px] mt-20 text-sm/6 text-black tracking-wide">
              UniTraffic simplifies vehicle access at New Era University by offering quick and
              secure sticker registration verification, violation tracking, and efficient role-based
              access for students, staff, and admins. With a simple search, vehicles are verified,
              and violations are easily monitored, view ownership details, violation history, and
              issue tickets directly.
            </p>
          </div>
        </div>
      </div>
    </RedirectToDashboard>
  );
}
