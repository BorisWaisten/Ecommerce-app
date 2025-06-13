"use client";
import { useGetProducts } from "@/api/getProducts";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";

export default function PageOffers() {
    const { loading, result: products = [], error } = useGetProducts(); 
    console.log(products + " ofertas");

    if (loading) return <p className="text-center">Cargando ofertas...</p>;
    if (error) return <p className="text-center text-red-500">Error al cargar productos</p>;

    const productsWithDiscount = products?.map((product: { _id: number, name: string, image: string, price:number}) => {
        if (!product || !product.price) return null; 

        const discountPercentage = Math.floor(Math.random() * 31) + 10; 
        const discountedPrice = product.price - (product.price * discountPercentage / 100);
        return { ...product, discountPercentage, discountedPrice: discountedPrice };
    }).filter(Boolean); 

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Ofertas Especiales</h1>
            {productsWithDiscount &&productsWithDiscount.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsWithDiscount.map((product) => (
                        <div key={product?._id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                            <Link href={`/product/${product?._id}`}>
                            <Image src={product?.image ?? ''} alt={product?.name ?? ''} className="w-full h-48 object-cover rounded-md mb-4" />                            </Link>
                            <h2 className="text-lg font-semibold">{product?.name}</h2>
                            <p className="text-gray-500 line-through">{formatPrice(product?.price ?? 0)}</p>
                            <p className="text-red-600 font-bold text-xl">{formatPrice(product?.discountedPrice ?? 0)}</p>
                            <p className="text-green-600">-{product?.discountPercentage}% OFF</p>
                            <button className={buttonVariants()}>Comprar</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No hay ofertas disponibles</p>
            )}
        </div>
    );
}
