'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Search, Grid3X3, List, Filter, X } from 'lucide-react';
import { useGetCategoryProduct } from '@/api/getCategoryProduct';
import ProductCard from './components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const PageCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { result: products = [], loading, error } = useGetCategoryProduct(categorySlug);
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product: any) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin;
      return matchesSearch && matchesOrigin;
    });
  }, [products, searchTerm, selectedOrigin]);

  // Obtener orígenes únicos
  const origins = useMemo(() => {
    if (!products) return [];
    const uniqueOrigins = Array.from(new Set(products.map((product: any) => product.origin)));
    return uniqueOrigins.filter(Boolean);
  }, [products]);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            {categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Descubre nuestra colección de productos únicos
          </p>
        </motion.div>

        {/* Controles y filtros */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl"
              >
                <Filter size={16} />
                Filtros
              </Button>

              {/* Toggle vista */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-lg"
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-lg"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Filtros expandibles */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedOrigin === 'all' ? 'default' : 'secondary'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedOrigin('all')}
                  >
                    Todos
                  </Badge>
                  {origins.map((origin) => (
                    <Badge
                      key={origin}
                      variant={selectedOrigin === origin ? 'default' : 'secondary'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedOrigin(origin)}
                    >
                      {origin}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid de productos */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product: any, index: number) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  layout
                  className={viewMode === 'list' ? 'flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm' : ''}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageCategory;
