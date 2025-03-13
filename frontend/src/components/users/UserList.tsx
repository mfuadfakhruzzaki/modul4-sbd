"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers, User } from "@/lib/api";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Link from "next/link";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse neo-card inline-block px-12 py-6">
          <h3 className="text-2xl font-bold">Loading users...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <Alert type="error" message={error} />
        <div className="mt-6 text-center">
          <Link href="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="neo-card inline-block p-8">
          <h3 className="text-2xl font-bold mb-2">No users found</h3>
          <p>There are no users in the database yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="p-4 border-3 border-black text-left">ID</th>
              <th className="p-4 border-3 border-black text-left">Name</th>
              <th className="p-4 border-3 border-black text-left">Email</th>
              <th className="p-4 border-3 border-black text-left">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b-3 border-black hover:bg-neutral"
              >
                <td className="p-4 border-3 border-black">{user.id}</td>
                <td className="p-4 border-3 border-black font-bold">
                  {user.nama}
                </td>
                <td className="p-4 border-3 border-black">{user.email}</td>
                <td className="p-4 border-3 border-black">
                  {formatDate(user.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
