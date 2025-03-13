"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import { getAllProducts, getAllUsers } from "@/lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [productCount, setProductCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch data in parallel
        const [products, users] = await Promise.all([
          getAllProducts(),
          getAllUsers(),
        ]);

        setProductCount(products.length);
        setUserCount(users.length);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching dashboard data"
        );
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Welcome to Dashboard
      </h1>
      <p className="text-lg mb-8">
        Hello, <span className="font-bold">{user?.nama || "User"}</span>!
        Here&apos;s an overview of your data.
      </p>

      {error && (
        <div className="mb-8 p-4 bg-[#ff5d5d] text-white border-3 border-black shadow-neo">
          <p className="font-bold">Error: {error}</p>
          <p>There was a problem fetching your dashboard data.</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="neo-card animate-pulse h-48">
              <div className="h-4 bg-gray-200 w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-200 w-1/2 mb-6"></div>
              <div className="h-8 bg-gray-200 w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products Stats */}
          <div className="neo-card bg-secondary text-white">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <p className="text-4xl font-bold mb-6">
              {productCount !== null ? productCount : "—"}
            </p>
            <Link href="/dashboard/products">
              <Button variant="accent">View All Products</Button>
            </Link>
          </div>

          {/* Users Stats */}
          <div className="neo-card bg-[#ff5d5d] text-white">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <p className="text-4xl font-bold mb-6">
              {userCount !== null ? userCount : "—"}
            </p>
            <Link href="/dashboard/users">
              <Button variant="accent">View All Users</Button>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/products/add">
            <div className="neo-card bg-accent text-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg transition-all">
              <h3 className="text-xl font-bold mb-2">Add New Product</h3>
              <p>Create a new product entry in your inventory.</p>
            </div>
          </Link>
          <Link href="/dashboard/products">
            <div className="neo-card bg-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg transition-all">
              <h3 className="text-xl font-bold mb-2">Manage Products</h3>
              <p>View and manage your existing products.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
