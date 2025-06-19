"use client";
import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const services = [
  {
    icon: Code,
    title: "Desarrollo Web Personalizado",
    description: "Creamos sitios web únicos adaptados a tu marca y necesidades específicas",
    color: "text-blue-600"
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Desarrollo de apps nativas e híbridas para iOS y Android",
    color: "text-green-600"
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description: "Interfaces modernas y experiencias de usuario excepcionales",
    color: "text-purple-600"
  },
  {
    icon: Globe,
    title: "E-commerce Completo",
    description: "Tiendas online con todas las funcionalidades que necesitas",
    color: "text-orange-600"
  },
  {
    icon: Zap,
    title: "Optimización de Performance",
    description: "Mejoramos la velocidad y eficiencia de tu aplicación",
    color: "text-yellow-600"
  },
  {
    icon: Shield,
    title: "Mantenimiento y Soporte",
    description: "Soporte técnico continuo y actualizaciones regulares",
    color: "text-red-600"
  }
];

export default function BrandSection() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <Code size={20} />
            <span className="font-bold">WAISTENPROGRAMACIÓN</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            ¿Te gusta lo que ves?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Podemos crear algo similar o completamente personalizado para tu negocio. 
            <span className="text-blue-400 font-semibold"> ¡Todo es posible!</span>
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="https://waistenprogramacion.com"
              target="_blank"
              className={buttonVariants({ 
                variant: "default", 
                size: "lg",
                className: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full text-lg"
              })}
            >
              Ver Nuestro Portfolio
            </Link>
            <Link
              href="mailto:contacto@waistenprogramacion.com"
              className={buttonVariants({ 
                variant: "outline", 
                size: "lg",
                className: "border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-full text-lg"
              })}
            >
              Contactar Ahora
            </Link>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:bg-white/20">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 mb-6 ${service.color}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon size={32} />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                
                <motion.div
                  className="mt-6 flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <span>Saber más</span>
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para transformar tu idea en realidad?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Desde conceptos simples hasta aplicaciones complejas, 
              nuestro equipo está listo para hacer realidad tu visión digital.
            </p>
            <Link
              href="https://waistenprogramacion.com/contacto"
              target="_blank"
              className={buttonVariants({ 
                size: "lg",
                className: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
              })}
            >
              Comenzar Proyecto
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 