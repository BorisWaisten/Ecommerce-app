"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { productSlug } = params;

    const { result, loading, error }: ResponseType = useGetProductBySlug(productSlug);

    if (loading) {
        return <SkeletonProduct />;
    }

    return (
        <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Botón Volver */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Volver</span>
                </motion.button>

                {/* Contenedor principal */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Columna izquierda - Carousel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-full"
                        >
                            <div className="sticky top-24 p-8">
                                <CarouselProduct images={result.image} />
                            </div>
                        </motion.div>

                        {/* Columna derecha - Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="p-8 lg:pr-12"
                        >
                            <InfoProduct product={result} />
                        </motion.div>
                    </div>

                    {/* Sección de detalles adicionales */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="border-t border-gray-200 dark:border-gray-700 p-8"
                    >
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Características */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    Características
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li>• Calidad Premium</li>
                                    <li>• Garantía de satisfacción</li>
                                    <li>• Envío rápido</li>
                                </ul>
                            </div>

                            {/* Especificaciones */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    Especificaciones
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                        Origen: {result.origin || "No especificado"}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                        Categoría: {result.productCategory}
                                    </li>
                                </ul>
                            </div>

                            {/* Envío */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    Envío
                                </h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li>• Envío gratuito</li>
                                    <li>• Entrega en 24-48h</li>
                                    <li>• Seguimiento en tiempo real</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
