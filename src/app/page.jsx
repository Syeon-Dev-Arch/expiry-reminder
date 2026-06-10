"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Particles } from "@/components/ui/particles";

export default function Home() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-100 via-slate-50 to-slate-200">
      <Particles color="black" />
      <h1 className="text-4xl font-bold tracking-tight text-black">
        Expiry Reminder
      </h1>
      <p className="text-2xl font-bold tracking-tight text-black">
        Never forget about your expiring items again!
      </p>
      <div className="mt-4">
        <Button
          className="gap-4 mt-6 cursor-pointer"
          variant="default"
          size="lg"
          onClick={() => router.push("/signup")}
        >
          Get Started
        </Button>{" "}
        <Button
          className="gap-4 mt-6 cursor-pointer"
          variant="default"
          size="lg"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
