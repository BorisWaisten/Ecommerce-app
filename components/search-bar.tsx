"use client";
import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { ProductType } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface SearchBarProps {
    isScrolled: boolean;
}

const SearchBar = ({ isScrolled }: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    
    const { searchTerm, setSearchTerm, filteredProducts, loading, clearSearch } = useSearch();

    // Cerrar dropdown cuando se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Mostrar resultados cuando hay término de búsqueda
    useEffect(() => {
        setShowResults(searchTerm.length > 0);
    }, [searchTerm]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
            setShowResults(false);
            setIsOpen(false);
        }
    };

    const handleProductClick = (product: ProductType) => {
        router.push(`/product/${product._id}`);
        setShowResults(false);
        setIsOpen(false);
        clearSearch();
    };

    const handleClearSearch = () => {
        clearSearch();
        setShowResults(false);
        inputRef.current?.focus();
    };

    const handleInputFocus = () => {
        if (searchTerm.length > 0) {
            setShowResults(true);
        }
    };

    return (
        <div ref={searchRef} className="relative">
            {/* Botón de búsqueda para móvil */}
            <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-auto w-auto hover:bg-transparent ${
                    isScrolled ? 'text-black dark:text-white' : 'text-white'
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Search strokeWidth={1} className="h-5 w-5" />
            </Button>

            {/* Input de búsqueda */}
            {isOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 backdrop-blur-sm">
                    <form onSubmit={handleSearch} className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={handleInputFocus}
                                className="pl-10 pr-10 h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                            />
                            {searchTerm && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                    onClick={handleClearSearch}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    </form>

                    {/* Resultados de búsqueda */}
                    {showResults && (
                        <div className="max-h-96 overflow-y-auto border-t border-gray-200 dark:border-gray-700">
                            {loading ? (
                                <div className="flex items-center justify-center p-6">
                                    <Loader2 className="h-5 w-5 animate-spin mr-3 text-blue-500" />
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Buscando productos...</span>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="p-2">
                                    {filteredProducts.slice(0, 4).map((product) => (
                                        <div
                                            key={product._id}
                                            className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all duration-200 group"
                                            onClick={() => handleProductClick(product)}
                                        >
                                            <div className="relative">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 object-cover rounded-lg mr-3 group-hover:scale-105 transition-transform duration-200"
                                                />
                                                {product.stock === 0 && (
                                                    <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                                                        <span className="text-xs font-medium text-red-600 bg-white px-1 rounded">Agotado</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {product.description}
                                                </p>
                                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredProducts.length > 4 && (
                                        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                onClick={() => {
                                                    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
                                                    setShowResults(false);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Ver todos los resultados ({filteredProducts.length})
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : searchTerm.length > 0 ? (
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No se encontraron productos</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Intenta con otros términos de búsqueda</p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
