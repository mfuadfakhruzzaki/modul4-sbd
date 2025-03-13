import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-dark text-white border-t-3 border-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              API<span className="text-primary">FRONTEND</span>
            </h3>
            <p className="mb-4">
              A neobrutalism-style Next.js application to demonstrate REST API
              interactions.
            </p>
            <p>
              Created for learning purposes. Based on Node.js Express backend
              with MySQL database.
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/auth/login" className="hover:text-primary">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-primary">
                Register
              </Link>
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-4 text-sm text-center">
          <p>© {new Date().getFullYear()} APIFrontend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
