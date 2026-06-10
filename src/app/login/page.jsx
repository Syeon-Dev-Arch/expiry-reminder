"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Login() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonD, setButtonD] = useState(true);
  const [error, setError] = useState({ success: true, text: "" });

  const login = async () => {
    try {
      if (!user.email || !user.password) return;
      setError({ success: true, text: "" });
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log(response);
      route.push("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      setError({ success: false, text: error.response.data.error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length === 0 || user.password.length === 0) {
      setButtonD(true);
    } else {
      setButtonD(false);
    }
  }, [user]);

  return (
    // Background changed from bg-slate-50 to pure white
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      {/* Card border changed from border-slate-200 to neutral black/border-neutral-200 */}
      <Card className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-black">
            Login in to your account
          </CardTitle>
          <p className="text-sm text-black mt-1">
            Manage your active reminders
          </p>
          <p className="text-sm text-black mt-1">
            {loading ? "Logging in..." : null}

            {error.success ? (
              ""
            ) : (
              <span className="text-red">{error.text}</span>
            )}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 text-left mt-6">
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
              // Input background changed from bg-slate-50 to bg-white, ring/borders updated to black tones
              className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              // Input background changed from bg-slate-50 to bg-white, ring/borders updated to black tones
              className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
          </div>

          {/* Clean, standard CTA Button */}
          <Button variant="default" onClick={login} disabled={buttonD}>
            {buttonD ? "All fields are required" : "Login In"}
          </Button>
          {/* look for the forgot password */}
          <Button onClick={(e) => route.push("/forgotpassword")}>
            Forgot Password
          </Button>
        </CardContent>
        <Link href={"/signup"}>Visit SignUp</Link>
      </Card>
    </div>
  );
}

export default Login;
