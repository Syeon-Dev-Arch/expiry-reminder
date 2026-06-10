"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Forgoutpasswordemailform() {
  const [error, seterror] = useState({ fail: false, message: "" });
  const [email, setEmail] = useState("");
  const [buttonD, setButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitform = async () => {
    if (!email) return;
    try {
      seterror({ fail: false, message: "" });
      setLoading(true);
      const response = await axios.post("/api/user/emailforgoutpassword", {
        email,
      });
      console.log(response);
      setDone(true);
    } catch (error) {
      console.log(error);
      seterror({ fail: true, message: error.response.data.error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length === 0) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [email]);

  const showBanner = error.fail || loading || done;

  const getBannerText = () => {
    if (loading) return "Processing request...";
    if (done) return "Check your email for the recovery link.";
    if (error.fail) return error.message;
    return "";
  };
  return (
    // Pure white backdrop with consistent positioning
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      {/* Stark, minimal card container */}
      <Card className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-black">
            Reset Password
          </CardTitle>
          <p className="text-sm text-neutral-500 mt-1">
            Enter your email to recover your account
          </p>
        </CardHeader>

        {/* Global Loading, Success, or Error Alert Banner */}
        {showBanner && (
          <div
            className={`mt-4 p-3 text-xs font-medium rounded-xl text-center tracking-wide transition-all ${
              done
                ? "bg-neutral-100 text-neutral-900 border border-neutral-200"
                : "bg-black text-white"
            }`}
          >
            {getBannerText()}
          </div>
        )}

        <CardContent className="flex flex-col gap-4 text-left mt-6 p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitform();
            }}
            className="flex flex-col gap-4"
          >
            {/* Email Input Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email-id"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email-id"
                placeholder="name@example.com"
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Main Action Button */}
            <Button
              type="submit"
              variant="default"
              className="w-full mt-2 py-3 font-medium text-sm"
              disabled={buttonD || loading}
            >
              {loading ? "Sending..." : "Request Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Forgoutpasswordemailform;
