"use client";

import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode"; // ✅ import JwtPayload type
import { notification } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Extend JwtPayload to include custom claims if needed
interface CustomJwtPayload extends JwtPayload {
  exp?: number;
  // add other fields like `id`, `email`, `role`, etc. if your token has them
}

interface HeaderLink {
  label: string;
  path: string;
}

export default function Header() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // ********************* Sign Out & Token Expiry Handling
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");

    if (userToken) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(userToken);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded?.exp && decoded.exp < currentTime) {
          console.log("Token has expired. Clearing localStorage...");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("access_token");
      }
    }

    setAuthenticated(!!userToken);
  }, []);

  const headersLinks: HeaderLink[] = [
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
          <header className="text-4xl font-bold relative text-black">
            <Link href="/">LOGO</Link>
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
                localStorage.removeItem("access_token");
                setAuthenticated(false);
                notification.success({
                  message: "Success",
                  description: "Signed out successfully!",
                  duration: 3,
                });
                router.push("/");
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
