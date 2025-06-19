"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function BannerDiscount() {
    return (
        <motion.div
            className="p-5 sm:p-20 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
            <h2 className="uppercase font-black text-2xl text-primary">Consigue hasta un -25%</h2>
            <h3 className="mt-3 font-semibold">-20% al gastar 100€ o -25% al gastar 150€. Usa el código de APPECO</h3>

            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                    <Link href="#" className={buttonVariants()}>Comprar</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                    <Link href="#" className={buttonVariants({ variant: "outline" })}>Más información</Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

