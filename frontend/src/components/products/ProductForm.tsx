"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { addProduct } from "@/lib/api";

const ProductForm: React.FC = () => {
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [linkGambar, setLinkGambar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!nama || !stok) {
      setError("Product name and stock are required");
      return;
    }

    const stockNum = parseInt(stok, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setError("Stock must be a valid number");
      return;
    }

    // Submit the product
    try {
      setIsLoading(true);

      // Make sure to match the API's expected payload structure
      await addProduct(
        nama,
        stockNum,
        linkGambar || null // Convert empty string to undefined
      );

      setSuccess(true);

      // Clear form
      setNama("");
      setStok("");
      setLinkGambar("");

      // Redirect to products list after a delay
      setTimeout(() => {
        router.push("/dashboard/products");
      }, 2000);
    } catch (err) {
      console.error("Product form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add product. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="neo-card">
        <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        {success && (
          <Alert
            type="success"
            message="Product added successfully! Redirecting..."
          />
        )}

        <Input
          id="productName"
          label="Product Name"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <Input
          id="stock"
          type="number"
          label="Stock"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          required
        />

        <Input
          id="imageLink"
          label="Image URL (optional)"
          placeholder="https://example.com/image.jpg"
          value={linkGambar}
          onChange={(e) => setLinkGambar(e.target.value)}
        />

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || success}
            className="flex-1"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
