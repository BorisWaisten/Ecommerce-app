/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut } from "lucide-react";

interface CarouselProductProps {
  images: string;
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="relative group">
      {/* Botón de zoom */}
      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {isZoomed ? (
          <ZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Imagen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isZoomed ? "zoomed" : "normal"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <div className={`
            overflow-hidden rounded-2xl
            ${isZoomed ? 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8' : 'relative'}
          `}>
            <motion.img
              src={images}
              alt="Product image"
              className={`
                rounded-2xl object-cover
                ${isZoomed ? 'max-h-full max-w-full object-contain' : 'w-full aspect-square'}
              `}
              layoutId="product-image"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de interacción */}
      {!isZoomed && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full">
            <ZoomIn className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselProduct;
