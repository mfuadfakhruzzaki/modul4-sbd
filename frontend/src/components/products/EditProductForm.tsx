"use client";

import React, { useState } from "react";
import { Product, updateProduct } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

interface EditProductFormProps {
  product: Product;
  onSuccess: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSuccess,
}) => {
  const [nama, setNama] = useState(product.nama);
  const [stok, setStok] = useState(product.stok.toString());
  const [linkGambar, setLinkGambar] = useState(product.link_gambar || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Check if image URL is a data URL (base64)
  const isDataUrl = (url: string) => {
    return url.startsWith("data:");
  };

  // Function to validate image URL length
  const validateImageUrl = (url: string) => {
    // If it's empty, that's fine
    if (!url) return null;

    // If it's a data URL (base64), it's likely too large for the database
    if (isDataUrl(url)) {
      return "Mohon gunakan layanan hosting gambar. URL data terlalu panjang untuk database.";
    }

    // If it's a regular URL but very long
    if (url.length > 500) {
      return "URL gambar terlalu panjang. Gunakan URL yang lebih pendek (kurang dari 500 karakter).";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!nama || !stok) {
      setError("Nama produk dan stok harus diisi");
      return;
    }

    const stockNum = parseInt(stok, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setError("Stok harus berupa angka valid");
      return;
    }

    // Validate image URL if provided
    if (linkGambar) {
      const urlError = validateImageUrl(linkGambar);
      if (urlError) {
        setError(urlError);
        return;
      }
    }

    // Submit the product
    try {
      setIsLoading(true);

      await updateProduct(
        product.id_barang,
        nama,
        stockNum,
        linkGambar || null // Ensure empty string is converted to null
      );

      setSuccess(true);

      // Callback to parent component
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      console.error("Product update error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui produk. Silakan periksa koneksi Anda dan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="neo-card">
        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        {success && (
          <Alert
            type="success"
            message="Produk berhasil diperbarui! Mengalihkan..."
          />
        )}

        <Input
          id="productName"
          label="Nama Produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <Input
          id="stock"
          type="number"
          label="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          required
        />

        <div className="mb-4">
          <label htmlFor="imageLink" className="block mb-2 font-bold text-lg">
            URL Gambar (opsional)
          </label>
          <Input
            id="imageLink"
            placeholder="https://contoh.com/gambar.jpg"
            value={linkGambar}
            onChange={(e) => setLinkGambar(e.target.value)}
          />
          <p className="mt-1 text-sm text-gray-600">
            Masukkan URL ke gambar (maks 500 karakter). Jangan gunakan URL data
            atau gambar yang dienkode base64.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onSuccess}
            className="flex-1"
            disabled={isLoading || success}
          >
            Batal
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || success}
            className="flex-1"
          >
            {isLoading ? "Memperbarui..." : "Perbarui Produk"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
