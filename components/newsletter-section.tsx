"use client";
import { motion } from "framer-motion";
import { Mail, Gift, ArrowRight } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Aquí iría la lógica para suscribir al newsletter
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <Mail size={20} />
            <span className="font-semibold">NEWSLETTER</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ¡No te pierdas nada!
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Suscríbete y recibe ofertas exclusivas, nuevos productos y 
            <span className="font-bold text-white"> 15% OFF en tu primera compra</span>
          </p>

          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Gift size={16} />
              <span className="text-sm font-semibold">Ofertas exclusivas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <ArrowRight size={16} />
              <span className="text-sm font-semibold">Nuevos productos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Gift size={16} />
              <span className="text-sm font-semibold">15% OFF</span>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email aquí..."
                className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                required
              />
              <motion.button
                type="submit"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Suscribirse
              </motion.button>
            </div>
          </motion.form>

          {isSubscribed && (
            <motion.div
              className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <p className="text-green-100 font-semibold">
                ¡Gracias por suscribirte! Revisa tu email para confirmar.
              </p>
            </motion.div>
          )}

          <motion.p
            className="text-sm text-blue-200 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            No spam, solo contenido valioso. Puedes cancelar en cualquier momento.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
} 