import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addLoveItem, lovedItems } = useLovedProducts();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isLoved = lovedItems.some(item => item._id === product._id);

  return (
    <div className="space-y-8">
      {/* Encabezado y nombre */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white text-black text-sm font-medium rounded-full border">
              Premium
            </span>
            <span className="px-3 py-1 bg-[#8B4513] text-white text-sm font-medium rounded-full">
              General
            </span>
          </div>
        </div>
        <button
          onClick={() => addLoveItem(product)}
          className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Heart
            size={24}
            className={`transition-colors duration-300 ${
              isLoved 
                ? 'fill-red-500 stroke-red-500' 
                : 'stroke-gray-400 hover:stroke-red-500'
            }`}
          />
        </button>
      </div>

      {/* Precio y descripción */}
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Impuestos incluidos
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {product.description}
        </p>
      </div>

      {/* Información de envío */}
      <div className="space-y-3 py-6 border-y border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Envío gratuito en 24-48h
            </p>
            <p className="text-sm text-gray-500">
              Entrega estimada: 2-3 días hábiles
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Devolución gratuita hasta 30 días
            </p>
            <p className="text-sm text-gray-500">
              Garantía de satisfacción
            </p>
          </div>
        </div>
      </div>

      {/* Botón de acción */}
      <div>
        <Button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`
            w-full h-14 text-lg font-medium rounded-xl
            transition-all duration-300
            ${isAdded 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            <span>
              {isAdded ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default InfoProduct;
