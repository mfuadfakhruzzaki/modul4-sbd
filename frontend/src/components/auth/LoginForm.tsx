"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="neo-card">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {(error || formError) && (
          <Alert
            type="error"
            message={formError || error || "An error occurred"}
            onClose={() => setFormError("")}
          />
        )}

        <Input
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link href="/auth/register" className="neo-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
