"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ correct import for Next.js App Router

export default function Header() {
  const router = useRouter(); // ✅ useRouter hook
  const [authenticated, setAuthenticated] = useState(false);

  // ********************* Sign Out & Token Expiry Handling
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");

    if (userToken) {
      try {
        const decoded: any = jwtDecode(userToken);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded?.exp < currentTime) {
          console.log("Token has expired. Clearing localStorage...");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access_token");
      }
    }

    setAuthenticated(!!userToken); // ✅ simplified check
  }, []); // ✅ run once after mount

  const headersLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Movies", path: "/movies" },
    { label: "Add Movie", path: "/createMovie" },
  ];

  return (
    <div className="bg-gray-100 items-center sticky top-0 z-50">
      <nav className="flex justify-between gap-1">
        <div className="m-4">
          <header className="text-4xl font-medium shadow-xl relative text-[#f7052d]">
            <Link href="/">MRS</Link>
          </header>
        </div>

        <div className="flex items-center">
          <ul className="flex justify-center gap-2 items-center truncate">
            {headersLinks.map((link, index) => (
              <li
                key={index}
                className="p-2 px-4 text-lg font-semibold shadow-md shadow-slate-100 text-black hover:bg-gray-300 rounded-md"
              >
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {authenticated ? (
          <div className="flex flex-row gap-3 items-center justify-center pr-5">
            <p
              className="bg-[#296192] hover:bg-[#296192a5] cursor-pointer px-5 py-2 text-white rounded-md text-lg"
              onClick={() => {
                localStorage.removeItem("access_token"); // ✅ clear only token
                setAuthenticated(false);
                notification.success({
                  message: "Success",
                  description: "Signed out successfully!",
                  duration: 3,
                });
                router.push("/"); // ✅ correct navigation in Next.js
              }}
            >
              Sign Out
            </p>
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center justify-center pr-5">
            <Link href="/signin">
              <p className="bg-[#296192] hover:bg-[#296192a5] px-5 py-2 text-white rounded-md text-lg">
                Sign In
              </p>
            </Link>
            <Link href="/signup">
              <p className="bg-[#296192] hover:bg-[#296192a5] px-5 py-2 text-white rounded-md text-lg">
                Sign Up
              </p>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
