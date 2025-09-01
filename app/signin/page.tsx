"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { signinApi } from "../api";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "../components/Loader";

interface SigninFormData {
  email: string;
  password: string;
}

interface SigninResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: unknown; // update with your real user type if available
}

export default function Signin() {
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
  });
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result: SigninResponse = await signinApi(formData);

      if (result.success) {
        if (result.token) {
          localStorage.setItem("access_token", result.token);
        }
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        notification.success({
          message: "Successful",
          description: result.message,
          duration: 3,
        });
        setIsLoading(false);
        navigate.push("/");
      } else {
        setIsLoading(false);
        notification.error({
          message: "Failed",
          description: result.message,
          duration: 3,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-fit m-[5%]">
      <div className="flex flex-col gap-4 pb-6 text-[#2C363F] font-semibold">
        <p className="text-4xl">
          Movie Reservation <br />
          System
        </p>
        <p className="text-[#8C8C8C]">Provide the following information</p>
      </div>
      <div className="bg-gradient-to-br from-slate-500 via-sky-200 to-green-200 flex justify-center w-fit p-20 mx-auto rounded-md border-2 signin-bg-img">
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <p className="text-4xl font-semibold text-center mb-5">Sign In</p>
          <div className="flex flex-col gap-7">
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Email:</label>
              <input
                type="email"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Password:</label>
              <input
                type="password"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex mx-auto">
              <button
                type="submit"
                className="w-[400px] text-[#2C363F] border-2 border-[#2C363F] rounded-[3px] p-3 uppercase font-semibold text-2xl"
              >
                {isLoading ? <Loader /> : "Sign In"}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg">
              Don’t have an account?{" "}
              <Link href="/signup">
                <span className="text-blue-500 underline">Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
