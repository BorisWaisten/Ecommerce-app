"use client";
import { motion } from "framer-motion";
import { Users, ShoppingCart, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2.5K+",
    label: "Clientes Satisfechos",
    color: "text-blue-600"
  },
  {
    icon: ShoppingCart,
    value: "15K+",
    label: "Productos Vendidos",
    color: "text-green-600"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Rating Promedio",
    color: "text-yellow-600"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Tasa de Éxito",
    color: "text-purple-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

export default function StatsSection() {
  return (
    <motion.section
      className="py-12 bg-gradient-to-r from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 group-hover:shadow-xl transition-shadow ${stat.color}`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={28} />
              </motion.div>
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
} 