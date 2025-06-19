"use client"
import { useLovedProducts } from "@/hooks/use-loved-products";
import LovedItemProduct from "./components/loved-item-product";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
    const { lovedItems } = useLovedProducts();
    const router = useRouter();

    return (
        <div className="min-h-[80vh] bg-gray-50 pt-10 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Tus Productos Favoritos
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Aquí encontrarás todos los productos que has marcado como favoritos
                        </p>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto">
                    {lovedItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm"
                        >
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No hay productos favoritos
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">
                                Explora nuestra tienda y marca los productos que más te gusten
                            </p>
                            <Button 
                                onClick={() => router.push("/")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                            >
                                Explorar productos
                            </Button>
                        </motion.div>
                    ) : (
                        <AnimatePresence>
                            <motion.ul 
                                className="space-y-6"
                                layout
                            >
                                {lovedItems.map((item) => (
                                    <LovedItemProduct key={item._id} product={item} />
                                ))}
                            </motion.ul>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
