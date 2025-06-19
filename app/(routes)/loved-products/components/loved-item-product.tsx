/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface LovedItemProductProps {
    product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
    const { product } = props;
    const router = useRouter();
    const { removeLovedItem } = useLovedProducts();
    const { addItem } = useCart();

    const addToCheckout = () => {
        addItem(product);
        removeLovedItem(product._id);
    };

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <div className="flex flex-col sm:flex-row">
                {/* Imagen */}
                <div 
                    className="relative w-full sm:w-48 h-48 sm:h-full cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/product/${product._id}`)}
                >
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Contenido */}
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <h2 
                                className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                                onClick={() => router.push(`/product/${product._id}`)}
                            >
                                {product.name}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {product.description}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        <button
                            onClick={() => removeLovedItem(product._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-6">
                        <Button
                            onClick={addToCheckout}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShoppingCart size={20} />
                            Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

export default LovedItemProduct;