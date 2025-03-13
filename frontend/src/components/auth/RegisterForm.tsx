"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Link from "next/link";
import { registerUser } from "@/lib/api";

const RegisterForm: React.FC = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!nama || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Submit the registration
    try {
      setIsLoading(true);
      await registerUser(nama, email, password);
      setSuccess(true);

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="neo-card">
        <h2 className="text-3xl font-bold mb-6">Register</h2>

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        {success && (
          <Alert
            type="success"
            message="Registration successful! Redirecting to login..."
          />
        )}

        <Input
          id="nama"
          label="Full Name"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

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

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || success}
          className="mt-4"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="neo-link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
