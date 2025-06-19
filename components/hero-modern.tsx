"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Package, CreditCard, Tag, ShoppingBag, Percent } from "lucide-react";

const icons = [
  { icon: ShoppingCart, size: 40, position: { top: '15%', left: '10%' } },
  { icon: Package, size: 60, position: { top: '20%', left: '80%' } },
  { icon: CreditCard, size: 50, position: { top: '70%', left: '20%' } },
  { icon: Tag, size: 45, position: { top: '80%', left: '75%' } },
  { icon: ShoppingBag, size: 70, position: { top: '40%', left: '50%' } },
  { icon: Percent, size: 55, position: { top: '5%', left: '40%' } },
];

export default function HeroModern() {
  return (
    <section className="relative flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] overflow-hidden">
      
      {/* Animated SVG background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{ ...item.position }}
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={{ 
              y: [0, Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <item.icon size={item.size} />
          </motion.div>
        ))}
      </div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 text-center text-white max-w-2xl mx-auto px-4"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Consigue hasta un <span className="text-blue-400">-25%</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light">
          -20% al gastar 100€ o -25% al gastar 150€. Usa el código <b>APPECO</b>.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.a
            href="#productos"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Comprar
          </motion.a>
          <motion.a
            href="#mas-info"
            className="bg-transparent border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Más información
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
} 