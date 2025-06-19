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
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useGetProducts } from "@/api/getProducts";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { CategoryType } from "@/types/category";
import { useGetCategories } from "@/api/getCategories";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function FeaturedProducts () {
  const { result, loading }: ResponseType = useGetProducts()
  const router = useRouter();
  const { addItem } = useCart();
  
  console.log(result +"carrusel");

  return (
    <motion.div
      className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.h3
        className="px-6 text-3xl sm:pb-8 text-center"
        variants={fadeInUp}
      >
        Productos destacados
      </motion.h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.map((product: ProductType) => {
              const { image, name, _id } = product;

              return (
                <CarouselItem
                  key={_id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <motion.div
                    className="p-1"
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <motion.img
                          src={image}
                          alt="Image featured"
                          className="rounded-lg"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </motion.div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{name}</h3>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </motion.div>
  );
}
