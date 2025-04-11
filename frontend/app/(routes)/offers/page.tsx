'use client'
import { useGetProducts } from "@/api/getProducts";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";

export default function PageOffers() {
    const { loading, result: products, error } = useGetProducts();
    console.log(products +" ofertas");
    

    if (loading) return <p className="text-center">Cargando ofertas...</p>;
    if (error) return <p className="text-center text-red-500">Error al cargar productos</p>;

    // Generar descuentos aleatorios
    const productsWithDiscount = products?.map(product=> {
        const discountPercentage = Math.floor(Math.random() * 31) + 10; // Descuento entre 10% y 40%
        const discountedPrice = product.price - (product.price * discountPercentage / 100);
        return { ...product, discountPercentage, discountedPrice };
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Ofertas Especiales</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsWithDiscount?.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                        <Link href={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                        </Link>
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-500 line-through">{formatPrice(product.price)}</p>
                        <p className="text-red-600 font-bold text-xl">{formatPrice(product.discountedPrice)}</p>
                        <p className="text-green-600">-{product.discountPercentage}% OFF</p>
                        <button className={buttonVariants()}>Comprar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
