/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetProducts } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";


const Chooseproduct = () => {
  const { result, loading }: ResponseType = useGetProducts();

  const categories = [
    {
      id:1,
      categoryName:"Remeras",
      mainImage:{url:"./DEVWAISTEN.png"}
    },
    {
      id:2,
      categoryName:"Pantalones",
      mainImage:{url:"./DEVWAISTEN.png"}
    }
    ,
    {
      id:3,
      categoryName:"Busos",
      mainImage:{url:"./DEVWAISTEN.png"}
    }
  ]
    
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoría favorita
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          categories !== null &&
          categories.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
            >
              <img
                src={category.mainImage.url}
                alt={category.categoryName}
                className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
              />
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {category.categoryName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Chooseproduct;
