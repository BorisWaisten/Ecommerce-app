/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetProducts } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";

const categoryImages = [
  {url: "./categoryPhone"},
  {url: "./categorySound"},
  {url: "./categoryWeb"},
]

const Chooseproduct = () => {
  const { result, loading }: ResponseType = useGetProducts();
    
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoría favorita
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          result !== null &&
          result.map((product: ProductType) => (
            <Link
              key={product.id}
              href={`/`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
              />
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {product.name}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Chooseproduct;
