"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts, Product } from "@/lib/api";
import ProductCard from "./ProductCard";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse neo-card inline-block px-12 py-6">
          <h3 className="text-2xl font-bold">Loading products...</h3>
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

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="neo-card inline-block p-8 mb-6">
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="mb-6">There are no products in the database yet.</p>
          <Link href="/dashboard/products/add">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Products</h2>
        <Link href="/dashboard/products/add">
          <Button variant="accent">+ Add New Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id_barang} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
