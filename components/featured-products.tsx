/* eslint-disable @next/next/no-img-element */
"use client";

import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart, Heart, Star, Zap } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useGetProducts } from "@/api/getProducts";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getCategories";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { useState, useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export default function FeaturedProducts() {
  const { result, loading, error }: ResponseType = useGetProducts();
  const router = useRouter();
  const { addItem } = useCart();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Debug logs
  console.log('Featured Products - Loading:', loading);
  console.log('Featured Products - Result:', result);
  console.log('Featured Products - Error:', error);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !result || result.length <= 1) return;
    
    const interval = setInterval(() => {
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, result]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <motion.div
      className="max-w-7xl py-8 mx-auto px-4 sm:py-16 sm:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.div className="text-center mb-8" variants={fadeInUp}>
        <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Productos Destacados
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubre nuestros productos más populares y mejor valorados
        </p>
      </motion.div>

      <motion.div
        className="relative"
        variants={staggerContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="overflow-hidden">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            ) : error ? (
              // Error state
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Error al cargar productos</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        No se pudieron cargar los productos. Intenta recargar la página.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ) : !result || result.length === 0 ? (
              // Empty state
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No hay productos disponibles</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Pronto tendremos productos increíbles para ti.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ) : (
              result?.map((product: ProductType, index: number) => (
                <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="p-2"
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card 
                      className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 cursor-pointer"
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      {/* Imagen del producto */}
                      <div className="relative aspect-square overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        />
                        
                        {/* Overlay con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            <Zap className="w-3 h-3 mr-1" />
                            Destacado
                          </Badge>
                          {product.stock === 0 && (
                            <Badge variant="destructive">Agotado</Badge>
                          )}
                        </div>

                        {/* Botones de acción */}
                        <motion.div
                          className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconButton
                            onClick={() => router.push(`/product/${product._id}`)}
                            icon={<Expand size={16} />}
                            className="bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 shadow-lg"
                          />
                          <IconButton
                            onClick={() => addItem(product)}
                            icon={<Heart size={16} />}
                            className="bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 shadow-lg"
                          />
                        </motion.div>

                        {/* Botón de compra rápida */}
                        <motion.div
                          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              addItem(product);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            Añadir al carrito
                          </button>
                        </motion.div>
                      </div>

                      {/* Información del producto */}
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {product.name}
                          </h3>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">(4.2)</span>
                          </div>

                          {/* Precio */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatPrice(product.price)}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          
          {/* Navegación mejorada */}
          <CarouselPrevious className="left-4 bg-white/90 hover:bg-white shadow-lg border-0 text-gray-700 hover:text-blue-600" />
          <CarouselNext className="right-4 bg-white/90 hover:bg-white shadow-lg border-0 text-gray-700 hover:text-blue-600" />
        </Carousel>

      </motion.div>
    </motion.div>
  );
}
