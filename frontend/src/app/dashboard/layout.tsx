"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="neo-card bg-white p-8 animate-pulse">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="sticky top-24 neo-card">
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-3 px-4 hover:bg-neutral font-bold border-b-2 border-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/products"
                    className="block py-3 px-4 hover:bg-neutral font-bold border-b-2 border-black"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/users"
                    className="block py-3 px-4 hover:bg-neutral font-bold"
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Mobile dashboard navigation */}
        <div className="lg:hidden col-span-1 mb-4">
          <div className="neo-card">
            <nav className="flex overflow-x-auto">
              <Link
                href="/dashboard"
                className="flex-shrink-0 py-3 px-6 font-bold whitespace-nowrap border-r-2 border-black"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/products"
                className="flex-shrink-0 py-3 px-6 font-bold whitespace-nowrap border-r-2 border-black"
              >
                Products
              </Link>
              <Link
                href="/dashboard/users"
                className="flex-shrink-0 py-3 px-6 font-bold whitespace-nowrap"
              >
                Users
              </Link>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="lg:col-span-9 xl:col-span-10">
          <div className="neo-card">{children}</div>
        </main>
      </div>
    </div>
  );
}
