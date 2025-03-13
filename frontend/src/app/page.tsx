import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="neo-container">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="neo-card bg-[#ff5d5d] text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                API Frontend Demo
              </h1>
              <p className="text-xl md:text-2xl">
                A Next.js application with neobrutalism design that connects to
                your REST API
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/auth/register"
                  className="neo-button-accent text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="neo-button-secondary text-center"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square p-6 border-3 border-black bg-white text-black shadow-neo-lg transform rotate-3">
                <div className="text-xl md:text-2xl font-bold font-mono mb-4">
                  {"// REST API Frontend"}
                </div>
                <pre className="font-mono text-sm md:text-base overflow-x-auto">
                  <code>{`fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="neo-card bg-[#5DB8FF] text-white transform hover:-rotate-1">
            <h3 className="text-2xl font-bold mb-4">User Authentication</h3>
            <p>
              Secure login and registration with JWT token based authentication.
            </p>
          </div>
          <div className="neo-card bg-[#FFD15D] text-black transform hover:rotate-1">
            <h3 className="text-2xl font-bold mb-4">Product Management</h3>
            <p>
              Create and view products with a responsive and interactive
              interface.
            </p>
          </div>
          <div className="neo-card bg-[#ff5d5d] text-white transform hover:-rotate-1">
            <h3 className="text-2xl font-bold mb-4">Neobrutalism Design</h3>
            <p>
              Experience the bold colors, sharp shadows, and geometric shapes of
              neobrutalism style.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="neo-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#ff5d5d] text-white text-2xl font-bold border-3 border-black shadow-neo rounded-full">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Register an Account</h3>
              <p>Create your account with a secure password to get started.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#5DB8FF] text-white text-2xl font-bold border-3 border-black shadow-neo rounded-full">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Login to Dashboard</h3>
              <p>Access your dashboard with your secure credentials.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#FFD15D] text-black text-2xl font-bold border-3 border-black shadow-neo rounded-full">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Manage Products</h3>
              <p>Create, view, and manage your product inventory.</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/auth/register" className="neo-button inline-block">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
