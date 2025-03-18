import React from "react";
import Card from "@/components/ui/Card";
import { Product } from "@/lib/api";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // For handling image errors
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      "https://fakeimg.pl/400x300/FF5D5D/ffffff?text=Maaf+Tidak+Ada+Gambar+😢&font_size=40";
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {product.link_gambar ? (
          <div className="relative h-48 mb-4 border-3 border-black overflow-hidden bg-gray-100">
            {/* Using Image from next/image would be better, but requires more setup */}
            {/* For now we'll keep using img tag with error handling */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.link_gambar}
              alt={product.nama}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="relative h-48 mb-4 border-3 border-black overflow-hidden bg-gray-100 flex items-center justify-center">
            <span className="text-gray-900 text-lg font-medium">
              Gambar tidak tersedia
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold mb-2">{product.nama}</h3>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Stok:</span>
            <span
              className={`font-bold ${
                product.stok > 5 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stok} unit
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">ID:</span>
            <span>{product.id_barang}</span>
          </div>

          <div className="mt-4 text-sm text-gray-900">
            <div>Dibuat: {formatDate(product.created_at)}</div>
            <div>Diperbarui: {formatDate(product.updated_at)}</div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-200">
            <Link
              href={`/dashboard/products/${product.id_barang}`}
              className="w-full"
            >
              <Button variant="primary" fullWidth>
                Lihat Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
