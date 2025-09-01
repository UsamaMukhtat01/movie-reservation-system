"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { signupApi } from "../api";
import { notification } from "antd";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define user form structure
interface UserFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      api.error({
        message: "Failed",
        description: "Passwords do not match",
        duration: 3,
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await signupApi(formData);

      if (result.success) {
        api.success({
          message: "Successful",
          description: result.message,
          duration: 3,
        });
        router.push("/signin");
      } else {
        api.error({
          message: "Failed",
          description: result.message,
          duration: 3,
        });
      }
    } catch (error) {
      api.error({
        message: "Error",
        description: "Something went wrong. Please try again later.",
        duration: 3,
      });
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-fit m-[5%]">
      {contextHolder}
      <div className="flex flex-col gap-4 pb-6 text-[#2C363F] font-semibold">
        <p className="text-4xl">
          Movie Reservation <br />
          System
        </p>
        <p className="text-[#8C8C8C]">Provide the following information</p>
      </div>
      <div className="bg-gradient-to-br from-slate-500 via-sky-200 to-green-200 flex justify-center w-fit p-20 mx-auto rounded-md border-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-4xl font-semibold text-center mb-5">SignUp</p>
          <div className="flex flex-col gap-7">
            {/* Name */}
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Enter Your Name</label>
              <input
                type="text"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Enter Your Email</label>
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
            {/* Password */}
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Enter Your Password</label>
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
            {/* Confirm Password */}
            <div className="text-[#2C363F] items-center flex sm:flex-row gap-7 justify-between">
              <label className="text-2xl font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-[300px] border-2 rounded-[3px] p-3 text-xl"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* Submit */}
            <div className="flex mx-auto">
              <button
                type="submit"
                className="w-[400px] text-[#2C363F] border-2 border-[#2C363F] rounded-[3px] p-3 uppercase font-semibold text-2xl"
              >
                {isLoading ? <Loader /> : "Create Account"}
              </button>
            </div>
          </div>
          {/* Redirect */}
          <div className="mt-5">
            <p className="text-lg">
              Already have an account?{" "}
              <Link href="/signin">
                <span className="text-blue-500 underline">SignIn</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
