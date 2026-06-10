"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Signup() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonD, setButtonD] = useState(true);
  const [error, setError] = useState({ success: true, text: "" });

  useEffect(() => {
    if (
      user.email.length === 0 ||
      user.password.length === 0 ||
      user.username.length === 0
    ) {
      setButtonD(true);
    } else {
      setButtonD(false);
    }
  }, [user]);

  const signUp = async () => {
    try {
      if (!user.email || !user.password || !user.username) return;
      setError({ success: true, text: "" });
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log(response);
      route.push("/login");
    } catch (error) {
      console.log(error);
      setError({ success: false, text: "something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Clean, pure white background to match login
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      {/* Stark, minimal card wrapper */}
      <Card className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-black">
            Create your account
          </CardTitle>
          <p className="text-sm text-black mt-1">
            Start tracking your expiry deadlines
          </p>
          <p className="text-sm text-black mt-1">
            {loading ? "Logging in..." : null}
            {error.success ? "" : error.text}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 text-left mt-6">
          {/* Username Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-xs font-semibold uppercase tracking-wider text-black"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-black"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
          </div>

          {/* Consistent Custom UI CTA Button */}
          <Button variant="default" onClick={signUp} disabled={buttonD}>
            {buttonD ? "All fields are required" : "Sign Up"}
          </Button>
        </CardContent>
        <Link href={"/login"}>Visit Login</Link>
      </Card>
    </div>
  );
}

export default Signup;
