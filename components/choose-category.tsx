/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getCategories";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    }
  }
};

export default function Chooseproduct() {
  const { result, loading, error }: ResponseType = useGetCategories();

  return (
    <motion.div
      className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <span className="font-bold">CATEGORÍAS</span>
        </motion.div>
        
        <motion.h3
          className="text-4xl md:text-5xl font-bold mb-4"
          variants={fadeInUp}
        >
          Explora por Categoría
        </motion.h3>
        
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Descubre productos únicos organizados por tus intereses favoritos
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {!loading &&
          result !== null &&
          result.map((category: CategoryType, index: number) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                duration: 0.3
              }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="relative block overflow-hidden bg-no-repeat bg-cover rounded-2xl group"
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.img
                    src={category.mainImage.url}
                    alt={category.categoryName}
                    className="w-full h-64 object-cover transition duration-500"
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category name with enhanced styling */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <motion.h4
                      className="text-2xl font-bold mb-2 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.categoryName}
                    </motion.h4>
                    
                    {/* Animated arrow */}
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <span>Explorar</span>
                      <motion.div
                        className="w-4 h-4"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        →
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}
