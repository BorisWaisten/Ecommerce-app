/* eslint-disable @next/next/no-img-element */
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";

import IconButton from "@/components/icon-button";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Link
      href={`/product/${product.id}`}
      className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md"
    >


      {/* Imagen del producto */}
      <div className="w-full max-w-sm">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl w-full object-cover"
        />
      </div>

      {/* Controles */}
      <div className="absolute w-full px-6 transition duration-200 opacity-0 hover:opacity-100 bottom-5">
        <div className="flex justify-center gap-x-6">
          <IconButton
            onClick={() => router.push(`/product/${product.id}`)}
            icon={<Expand size={20} className="text-gray-600" />}
          />
          <IconButton
            onClick={() => console.log("Added to cart")}
            icon={<ShoppingCart size={20} className="text-gray-600" />}
          />
        </div>
      </div>

      {/* Nombre y precio */}
      <p className="text-2xl text-center">{product.name}</p>
      <p className="font-bold text-center">{formatPrice(product.price)}</p>
    </Link>
  );
};

export default ProductCard;
