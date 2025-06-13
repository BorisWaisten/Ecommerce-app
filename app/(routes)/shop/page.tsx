"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PageShop = () => {
    const router = useRouter()

    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <h1 className="text-3xl font-bold mb-4">Mi Tienda</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Sección de Pedidos Recientes */}
                <div className="border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">📦 Pedidos Recientes</h2>
                    <p>No tienes pedidos recientes.</p>
                </div>

                {/* Sección de Cupones */}
                <div className="border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">🎟️ Cupones y Descuentos</h2>
                    <p>No hay cupones disponibles en este momento.</p>
                </div>
            </div>

            {/* Sección de Historial de Compras */}
            <div className="border p-4 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-2">🛍️ Historial de Compras</h2>
                <p>No hay compras registradas.</p>
            </div>
            
            {/* Botón para volver a la tienda */}
            <div className="mt-6">
                <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
            </div>
        </div>
    );
}

export default PageShop;
