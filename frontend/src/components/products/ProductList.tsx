"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts, deleteProduct, Product } from "@/lib/api";
import ProductCard from "./ProductCard";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengambil data produk"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteProduct(id);
      // Refresh product list
      await fetchProducts();
      setShowDeleteConfirm(null);
      setProductToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus produk");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(product.id_barang);
  };

  // Handling image errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      "https://fakeimg.pl/100x100/FF5D5D/ffffff?text=No+Image&font_size=12";
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse neo-card inline-block px-12 py-6">
          <h3 className="text-2xl font-bold">Memuat produk...</h3>
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
            <Button variant="secondary">Kembali ke Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="neo-card inline-block p-8 mb-6">
          <h3 className="text-2xl font-bold mb-2">Tidak ada produk</h3>
          <p className="mb-6">Belum ada produk dalam database.</p>
          <Link href="/dashboard/products/add">
            <Button>Tambah Produk Pertama</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Produk</h2>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-white border-3 border-black rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 ${
                viewMode === "cards" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("cards")}
            >
              <span role="img" aria-label="Grid View" className="mr-2">
                🖼️
              </span>
              Kartu
            </button>
            <button
              className={`px-4 py-2 ${
                viewMode === "table" ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setViewMode("table")}
            >
              <span role="img" aria-label="Table View" className="mr-2">
                📋
              </span>
              Tabel
            </button>
          </div>
          <Link href="/dashboard/products/add">
            <Button variant="accent">+ Tambah Produk Baru</Button>
          </Link>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border-3 border-black text-left">Gambar</th>
                <th className="p-4 border-3 border-black text-left">ID</th>
                <th className="p-4 border-3 border-black text-left">
                  Nama Produk
                </th>
                <th className="p-4 border-3 border-black text-left">Stok</th>
                <th className="p-4 border-3 border-black text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id_barang}
                  className="border-b-2 border-gray-300"
                >
                  <td className="p-2 border-3 border-black">
                    {product.link_gambar ? (
                      <div className="w-16 h-16 relative overflow-hidden border-2 border-gray-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.link_gambar}
                          alt={product.nama}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 border-2 border-gray-300">
                        Tidak ada gambar
                      </div>
                    )}
                  </td>
                  <td className="p-4 border-3 border-black">
                    {product.id_barang}
                  </td>
                  <td className="p-4 border-3 border-black font-bold">
                    {product.nama}
                  </td>
                  <td className="p-4 border-3 border-black">
                    <span
                      className={
                        product.stok > 5
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {product.stok} unit
                    </span>
                  </td>
                  <td className="p-4 border-3 border-black">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/products/${product.id_barang}`}>
                        <Button
                          variant="secondary"
                          className="text-sm py-1 px-3"
                        >
                          Detail
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        className="text-sm py-1 px-3 bg-red-600 hover:bg-red-700"
                        onClick={() => openDeleteModal(product)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id_barang} product={product} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="neo-card bg-white max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus produk{" "}
              <strong>{productToDelete.nama}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowDeleteConfirm(null)}
                variant="secondary"
                className="flex-1"
                disabled={isDeleting}
              >
                Batal
              </Button>
              <Button
                onClick={() => handleDelete(productToDelete.id_barang)}
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
};

export default ProductList;
