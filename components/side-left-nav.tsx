"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Grid3X3 } from "lucide-react";
import { useGetCategories } from "@/api/getCategories";
import { CategoryType } from "@/types/category";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SideLeftNavProps {
    isScrolled: boolean;
}

const SideLeftNav = ({ isScrolled }: SideLeftNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { result: categories, loading } = useGetCategories();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Botón trigger */}
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className={`flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isScrolled ? 'text-black dark:text-white' : 'text-white hover:text-gray-200'
                }`}
            >
                <Grid3X3 className="h-4 w-4" />
                <span className="font-medium">Categorías</span>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </Button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 backdrop-blur-sm">
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Grid3X3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">Categorías</h3>
                        </div>
                        
                        <div className="space-y-1 max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <span className="ml-2 text-sm text-gray-500">Cargando categorías...</span>
                                </div>
                            ) : categories && categories.length > 0 ? (
                                categories.map((category: CategoryType) => (
                                    <Link
                                        key={category._id}
                                        href={`/category/${category.slug}`}
                                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {category.categoryName}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    Explora productos de {category.categoryName}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Grid3X3 className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No hay categorías disponibles
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay para cerrar al hacer click fuera */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SideLeftNav;
