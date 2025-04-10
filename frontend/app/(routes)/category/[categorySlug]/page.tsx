'use client';

import { useParams } from 'next/navigation';
import { useGetCategoryProduct } from '@/api/getCategoryProduct';
import FiltersControlsCategory from './components/filters-controls-category';
import ProductCard from './components/product-card';
import { Separator } from '@/components/ui/separator';
import SkeletonSchema from '@/components/skeletonSchema';

const PageCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  

  const { result: products, loading, error } = useGetCategoryProduct(categorySlug);


  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {loading && <SkeletonSchema grid={3} />}
      
      {!loading && products && (
        <>
          <h1 className="text-3xl font-medium">Categoría: {categorySlug}</h1>
          <Separator />
          <div className="sm:flex sm:justify-between">
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
              {products?.length > 0 ? (
                products?.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No hay productos en esta categoría.</p>
              )}
            </div>
          </div>
        </>
      )}

      {!loading && !products && <p>No se encontraron productos para esta categoría.</p>}
    </div>
  );
};

export default PageCategory;
