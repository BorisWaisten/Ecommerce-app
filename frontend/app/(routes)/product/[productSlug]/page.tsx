"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function Page() {
    const params = useParams();
    const { productSlug } = params;

    const { result, loading, error }: ResponseType = useGetProductBySlug(productSlug);

    if (loading) {
        return <SkeletonProduct />;
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <div className="grid sm:grid-cols-2">
                <div>
                    {/* Pasar directamente la imagen en lugar de un array */}
                    <CarouselProduct images={result.image} />
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={result} />
                </div>
            </div>
        </div>
    );
}
