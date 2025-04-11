"use client"
import { useLovedProducts } from "@/hooks/use-loved-products";
import LovedItemProduct from "./components/loved-item-product";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const { lovedItems } = useLovedProducts();
    const router = useRouter();

    return (
        <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <h1 className="text-2xl font-bold mb-4">🧡 Productos que te gustan</h1>

            {lovedItems.length === 0 ? (
                <p className="text-gray-500 text-center">No hay productos en la sección de Me gusta</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {lovedItems.map((item) => (
                        <LovedItemProduct key={item._id} product={item} />
                    ))}
                </ul>
            )}

            <div className="mt-6 text-center">
                <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
            </div>
        </div>
    );
}
