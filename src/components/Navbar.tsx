'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Check login status when component mounts
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLogin === "true");
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="backdrop-blur-lg bg-white/10 shadow-lg fixed w-full top-0 flex items-center justify-between px-6 py-4 z-50">
      <h1 className="text-xl font-bold text-white">SmartX</h1>

      <div className="hidden md:flex space-x-6 text-white">
        <Link href="/" className="hover:text-gray-300 transition">Home</Link>
        <Link href="/pages/about" className="hover:text-gray-300 transition">About</Link>
        <Link href="/pages/contact" className="hover:text-gray-300 transition">Contact</Link>
      </div>

      <div className="hidden md:flex space-x-4">
        {pathname === "/dashboard" && isLoggedIn ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        ) : (
          <>
            <Link href="/pages/authpage?mode=login" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition">
              Login
            </Link>
            <Link href="/pages/authpage?mode=signup" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white p-6 space-y-4 flex flex-col items-center md:hidden">
          <Link href="/" className="hover:text-gray-300 transition" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/pages/about" className="hover:text-gray-300 transition" onClick={() => setOpen(false)}>About</Link>
          <Link href="/pages/contact" className="hover:text-gray-300 transition" onClick={() => setOpen(false)}>Contact</Link>
          {pathname === "/dashboard" && isLoggedIn ? (
            <button onClick={handleLogout} className="w-full text-center px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          ) : (
            <>
              <Link href="/pages/authpage?mode=login" className="w-full text-center px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/pages/authpage?mode=signup" className="w-full text-center px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
