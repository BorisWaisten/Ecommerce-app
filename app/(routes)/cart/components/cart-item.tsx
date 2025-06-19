/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CartItemProps {
    product: ProductType
}

const CartItem = (props: CartItemProps) => {
    const { product } = props;
    const { removeItem } = useCart();
    const router = useRouter();

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4"
        >
            <div className="flex items-center p-4">
                {/* Imagen */}
                <div 
                    className="relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/product/${product._id}`)}
                >
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Información del producto */}
                <div className="flex-1 ml-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 
                                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                                onClick={() => router.push(`/product/${product._id}`)}
                            >
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                {product.description}
                            </p>
                        </div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    {/* Controles */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => removeItem(product._id)}
                                className="flex items-center text-red-500 hover:text-red-600 transition-colors text-sm"
                            >
                                <Trash2 size={18} className="mr-1" />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

export default CartItem;