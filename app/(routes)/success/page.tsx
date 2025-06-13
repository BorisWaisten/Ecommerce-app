"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageSuccess = () => {
    const router = useRouter()

    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <div className="flex justify-center md:min-w-[400px]">
                    <Image src="/success.jpg" alt="Success" width={250} height={500} className="rounded-lg" />
                </div>

                <div>
                    <h1 className="text-3xl">¡Gracias por tu compra!</h1>
                    <p className="my-3">En breve, nuestro equipo se pondrá manos a la obra para preparar tu pedido con cuidado y dedicación. Mientras tanto, siéntate, relájate y deja que la anticipación de recibir tus productos favoritos te envuelva.</p>
                    <p className="my-3">Gracias de nuevo por confiar en nosotros. ¡Estamos deseando que disfrutes de tus productos!</p>
                    <p className="my-3">¡Disfruta tu compra!</p>

                    <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
                </div>
            </div>
        </div>
    );
}

export default PageSuccess;