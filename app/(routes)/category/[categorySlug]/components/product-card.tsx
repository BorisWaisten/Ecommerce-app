/* eslint-disable @next/next/no-img-element */
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";

import IconButton from "@/components/icon-button";

type ProductCardProps = {
  product: ProductType;
  viewMode?: 'grid' | 'list';
};

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const router = useRouter();

  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 w-full">
        {/* Imagen del producto */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              {product.description}
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </p>
          </div>
          
          {/* Controles */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => router.push(`/product/${product._id}`)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Expand size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => console.log("Added to cart")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ShoppingCart size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Imagen del producto */}
      <div 
        className="relative overflow-hidden rounded-lg mb-4 cursor-pointer"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay con controles */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/${product._id}`);
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Expand size={20} className="text-gray-800" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Added to cart");
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Información del producto */}
      <div 
        className="space-y-2 cursor-pointer"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
