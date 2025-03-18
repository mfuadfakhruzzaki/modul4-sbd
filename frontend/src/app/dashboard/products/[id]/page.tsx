"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getProductById, deleteProduct } from "@/lib/api";
import { Product } from "@/lib/api";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import EditProductForm from "@/components/products/EditProductForm";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal mengambil data produk"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProduct(id);
      router.push("/dashboard/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus produk");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handling image errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      "https://fakeimg.pl/600x400/FF5D5D/ffffff?text=Maaf+Tidak+Ada+Gambar+😢&font_size=40";
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="neo-card animate-pulse">
          <div className="h-8 bg-gray-200 w-1/3 mb-4"></div>
          <div className="h-48 bg-gray-200 mb-6"></div>
          <div className="h-6 bg-gray-200 w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-200 w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 w-2/3 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert type="error" message={error} />
        <div className="mt-6">
          <Link href="/dashboard/products">
            <Button variant="secondary">Kembali ke Daftar Produk</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <Alert type="error" message="Produk tidak ditemukan" />
        <div className="mt-6">
          <Link href="/dashboard/products">
            <Button variant="secondary">Kembali ke Daftar Produk</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Edit Produk</h2>
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Batal
          </Button>
        </div>
        <EditProductForm
          product={product}
          onSuccess={() => {
            setEditMode(false);
            // Reload product data
            getProductById(id)
              .then(setProduct)
              .catch((err) => {
                setError(
                  err instanceof Error
                    ? err.message
                    : "Gagal memperbarui data produk"
                );
              });
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Detail Produk</h2>
        <div className="flex space-x-4">
          <Link href="/dashboard/products">
            <Button variant="secondary">Kembali</Button>
          </Link>
        </div>
      </div>

      <div className="neo-card">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {product.link_gambar ? (
              <div className="relative aspect-square border-3 border-black overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.link_gambar}
                  alt={product.nama}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="relative aspect-square border-3 border-black overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-900 text-lg font-medium">
                  Gambar tidak tersedia
                </span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6">{product.nama}</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-bold">ID Produk:</span>
                <span>{product.id_barang}</span>
              </div>

              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-bold">Stok:</span>
                <span
                  className={
                    product.stok > 5
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {product.stok} unit
                </span>
              </div>

              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-bold">Dibuat pada:</span>
                <span>{formatDate(product.created_at)}</span>
              </div>

              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-bold">Terakhir diperbarui:</span>
                <span>{formatDate(product.updated_at)}</span>
              </div>

              {product.link_gambar && (
                <div className="flex justify-between border-b-2 pb-2">
                  <span className="font-bold">URL Gambar:</span>
                  <a
                    href={product.link_gambar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate max-w-xs"
                  >
                    {product.link_gambar}
                  </a>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              <Button
                onClick={() => setEditMode(true)}
                variant="secondary"
                className="flex-1"
              >
                Edit Produk
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Hapus Produk
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neo-card bg-white max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus produk{" "}
              <strong>{product.nama}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                variant="secondary"
                className="flex-1"
                disabled={isDeleting}
              >
                Batal
              </Button>
              <Button
                onClick={handleDelete}
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
