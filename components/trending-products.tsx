"use client";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Star } from "lucide-react";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";
import { useGetProducts } from "@/api/getProducts";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";

const getTrendingBadge = (index: number) => {
  if (index === 0) return { icon: Flame, text: "🔥 HOT", color: "bg-red-500" };
  if (index === 1) return { icon: TrendingUp, text: "📈 TRENDING", color: "bg-blue-500" };
  if (index === 2) return { icon: Star, text: "⭐ POPULAR", color: "bg-yellow-500" };
  return { icon: TrendingUp, text: "🔥 TRENDING", color: "bg-purple-500" };
};

export default function TrendingProducts() {
  const { result, loading }: ResponseType = useGetProducts();
  const router = useRouter();
  const { addItem } = useCart();

  // Simular productos trending (en un caso real, esto vendría del backend)
  const trendingProducts = result?.slice(0, 8) || [];

  return (
    <motion.section
      className="py-16 bg-gradient-to-br from-orange-50 via-white to-pink-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <TrendingUp size={20} />
            <span className="font-semibold">TRENDING NOW</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Productos en Tendencia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre los productos más populares que están arrasando en este momento
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {loading ? (
            // Skeleton loading
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </motion.div>
            ))
          ) : (
            trendingProducts.map((product: ProductType, index: number) => {
              const badge = getTrendingBadge(index);
              const { image, name, _id } = product;

              return (
                <motion.div
                  key={_id}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Badge de tendencia */}
                  <motion.div
                    className={`absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold ${badge.color}`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    <badge.icon size={12} />
                    {badge.text}
                  </motion.div>

                  {/* Gráfico de tendencia */}
                  <motion.div
                    className="absolute top-3 right-3 z-10 w-12 h-8 bg-white/90 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-end gap-1 h-6">
                      {[2, 4, 3, 5, 4, 6].map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-green-400 to-green-600 rounded-full"
                          style={{ height: `${height * 3}px` }}
                          animate={{ height: [`${height * 3}px`, `${(height + 2) * 3}px`, `${height * 3}px`] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={image}
                          alt={name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        {/* Overlay con botones */}
                        <motion.div
                          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <IconButton
                            onClick={() => router.push(`/product/${_id}`)}
                            icon={<Expand size={20} />}
                            className="bg-white text-gray-800 hover:bg-gray-100"
                          />
                          <IconButton
                            onClick={() => addItem(product)}
                            icon={<ShoppingCart size={20} />}
                            className="bg-white text-gray-800 hover:bg-gray-100"
                          />
                        </motion.div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            ${Math.floor(Math.random() * 200) + 50}
                          </span>
                          <motion.div
                            className="flex items-center gap-1 text-yellow-500"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                fill={star <= 4 ? "currentColor" : "none"}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">(24)</span>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </motion.section>
  );
} 