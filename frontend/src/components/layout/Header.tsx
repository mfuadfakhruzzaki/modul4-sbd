"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "../ui/Button";

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-3 border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            API<span className="text-[#FF5D5D]">FRONTEND</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-bold hover:text-[#ff5d5d]">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-bold hover:text-[#ff5d5d]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/products"
                  className="font-bold hover:text-[#ff5d5d]"
                >
                  Products
                </Link>
                <Link
                  href="/dashboard/users"
                  className="font-bold hover:text-[#ff5d5d]"
                >
                  Users
                </Link>
                <div className="border-r-2 border-black h-6 mx-2"></div>
                <span className="font-medium">Hi, {user?.nama || "User"}</span>
                <Button onClick={logout} variant="accent">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="neo-button-secondary">
                  Login
                </Link>
                <Link href="/auth/register" className="neo-button">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t-2 border-black">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/"
                  className="block font-bold hover:text-[#ff5d5d]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block font-bold hover:text-[#ff5d5d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products"
                      className="block font-bold hover:text-[#ff5d5d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/users"
                      className="block font-bold hover:text-[#ff5d5d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <span className="block mb-2 font-medium">
                      Hi, {user?.nama || "User"}
                    </span>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      variant="accent"
                      fullWidth
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/auth/login"
                      className="block font-bold text-center neo-button-secondary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/register"
                      className="block font-bold text-center neo-button w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
