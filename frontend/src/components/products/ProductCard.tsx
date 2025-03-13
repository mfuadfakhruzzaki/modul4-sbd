import React from "react";
import Card from "@/components/ui/Card";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {product.link_gambar ? (
          <div className="relative h-48 mb-4 border-3 border-black overflow-hidden bg-neutral">
            <img
              src={product.link_gambar}
              alt={product.nama}
              className="w-full h-full object-cover"
              onError={(e) => {
                // On error, replace with placeholder
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          </div>
        ) : (
          <div className="relative h-48 mb-4 border-3 border-black overflow-hidden bg-neutral flex items-center justify-center">
            <span className="text-neutral-dark text-lg font-medium">
              No Image Available
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold mb-2">{product.nama}</h3>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Stock:</span>
            <span
              className={`font-bold ${
                product.stok > 5 ? "text-green-600" : "text-primary"
              }`}
            >
              {product.stok} units
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">ID:</span>
            <span>{product.id_barang}</span>
          </div>

          <div className="mt-4 text-sm text-neutral-dark">
            <div>Created: {formatDate(product.created_at)}</div>
            <div>Updated: {formatDate(product.updated_at)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
