import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
            <div className="mt-4 text-center">
                <p>Sumérgete en una experiencia única</p>
                <h4 className="mt-2 text-5xl font-extrabold upperce">Productos</h4>
                <p className="my-2 text-lg">sloganes de productos</p>
                <Link href="#" className={buttonVariants()}>Comprar</Link>
            </div>
            <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/DEVWAISTEN.png')]  mx-20 bg-center mt-5" />
        </>
    );
}

export default BannerProduct;