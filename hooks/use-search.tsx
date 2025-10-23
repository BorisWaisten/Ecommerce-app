import { useState, useEffect, useMemo } from 'react';
import { ProductType } from '@/types/product';

export function useSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);

    // Cargar productos desde localStorage o API
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Primero intentar cargar desde localStorage
                const cachedProducts = localStorage.getItem('products');
                if (cachedProducts) {
                    const parsedProducts = JSON.parse(cachedProducts);
                    setProducts(parsedProducts);
                } else {
                    // Si no hay productos en cache, cargar desde API
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
                    const data = await response.json();
                    setProducts(data);
                    localStorage.setItem('products', JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Filtrar productos basado en el término de búsqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return [];
        
        return products.filter(product => 
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return {
        searchTerm,
        setSearchTerm,
        filteredProducts,
        loading,
        clearSearch
    };
}
