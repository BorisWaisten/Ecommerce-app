import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";

const ItemsMenuMobile = () => {
    const { result: categories, loading } = useGetCategories();

    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                {loading && <p className="text-sm">Cargando categorías...</p>}
                {!loading && categories && categories.map((category: CategoryType) => (
                    <Link 
                        key={category._id}
                        href={`/category/${category.slug}`} 
                        className="block py-2 px-2 hover:bg-gray-100 rounded"
                    >
                        {category.categoryName}
                    </Link>
                ))}
                {!loading && (!categories || categories.length === 0) && (
                    <p className="text-sm text-gray-500">No hay categorías disponibles</p>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default ItemsMenuMobile;