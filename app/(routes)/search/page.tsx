"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/hooks/use-search';
import { ProductType } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const { filteredProducts, loading } = useSearch();

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        window.location.href = '/search';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header de búsqueda */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {query ? `Resultados para "${query}"` : 'Buscar productos'}
                    </h1>
                    
                    {/* Barra de búsqueda */}
                    <form onSubmit={handleSearch} className="max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-10 h-12 text-lg"
                            />
                            {searchTerm && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={handleClearSearch}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Resultados */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <Skeleton className="h-48 w-full" />
                                    <CardContent className="p-4">
                                        <Skeleton className="h-4 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2 mb-2" />
                                        <Skeleton className="h-6 w-1/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                                        <div className="relative">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {product.stock === 0 && (
                                                <Badge className="absolute top-2 right-2 bg-red-500">
                                                    Agotado
                                                </Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <Badge variant="outline" className="text-xs">
                                                    {product.category}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    ) : query ? (
                        <div className="text-center py-12">
                            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No se encontraron productos
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                No hay productos que coincidan con "{query}"
                            </p>
                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <p>Intenta con:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Palabras clave diferentes</li>
                                    <li>Términos más generales</li>
                                    <li>Verificar la ortografía</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Busca productos
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Ingresa un término de búsqueda para encontrar productos
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
