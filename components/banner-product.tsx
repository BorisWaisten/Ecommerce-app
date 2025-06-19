"use client";
import { motion } from "framer-motion";

export default function BannerProduct() {
    return (
        <motion.div
            className="h-[350px] bg-cover lg:h-[600px] bg-[url('/DEVWAISTEN.png')] mx-20 bg-center mt-5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
    );
}