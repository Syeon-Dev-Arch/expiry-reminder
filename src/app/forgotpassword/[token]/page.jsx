"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

function RemanePassword() {
  const route = useRouter();
  const params = useParams();
  const token = params.token;
  const [error, setError] = useState({ fail: false, message: "" });
  const [buttonD, setButtonD] = useState(false);
  const [pass, setPass] = useState("");

  const submitpassword = async () => {
    try {
      if (!pass) return;
      setError({ fail: false, message: "" });
      const response = await axios.post(`/api/user/renamepassword/${token}`, {
        newPassword: pass,
      });
      route.push("/login");
    } catch (error) {
      console.log(error);
      setError({ fail: true, message: error.response.data.error });
    }
  };

  useEffect(() => {
    if (pass.length === 0) {
      setButtonD(true);
    } else {
      setButtonD(false);
    }
  }, [pass]);
  return (
    // Pure white backdrop with consistent positioning
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      {/* Stark, minimal card wrapper */}
      <Card className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight text-black">
            Update Password
          </CardTitle>
          <p className="text-sm text-neutral-500 mt-1">
            Ensure your account security with a new combination
          </p>
        </CardHeader>

        {/* Global Error/Alert Banner */}
        {error.fail && error.message && (
          <div className="mt-4 p-3 bg-black text-white text-xs font-medium rounded-xl text-center tracking-wide">
            {error.message}
          </div>
        )}

        <CardContent className="flex flex-col gap-4 text-left mt-6 p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitpassword();
            }}
            className="flex flex-col gap-4"
          >
            {/* New Password Input Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password-input"
                className="text-xs font-semibold uppercase tracking-wider text-black"
              >
                New Password
              </label>
              <input
                type="password"
                id="password-input"
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            {/* Submit Action Button */}
            <Button
              type="submit"
              variant="default"
              className="w-full mt-2 py-3 font-medium text-sm"
              disabled={buttonD}
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RemanePassword;
