"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import { getBackendUrl } from "@/lib/utils";

interface ProductsContextType {
  products: ProductType[] | null;
  categories: CategoryType[] | null;
  loading: boolean;
  error: string;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Función helper para cargar datos del localStorage de forma síncrona
function getCachedProducts(): ProductType[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem("products");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignorar errores de parseo
  }
  return null;
}

function getCachedCategories(): CategoryType[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem("categories");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignorar errores de parseo
  }
  return null;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  // Inicializar con datos del cache si están disponibles
  const [products, setProducts] = useState<ProductType[] | null>(() => getCachedProducts());
  const [categories, setCategories] = useState<CategoryType[] | null>(() => getCachedCategories());
  const [loading, setLoading] = useState(() => !getCachedProducts()); // Si hay cache, no mostrar loading
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setError("");
      
      // Hacer fetch para obtener datos actualizados
      const url = getBackendUrl('/api/products');
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const productsArray = Array.isArray(json) ? json : [];

      if (productsArray.length > 0) {
        localStorage.setItem("products", JSON.stringify(productsArray));
        setProducts(productsArray);
      } else if (productsArray.length === 0 && !products) {
        // Si no hay productos y no hay cache, establecer array vacío
        setProducts([]);
      }
    } catch (err: any) {
      setError(err?.message || "Error al cargar productos");
      // Si hay error pero tenemos datos en cache, mantenerlos
      if (!products) {
        const cachedProducts = getCachedProducts();
        if (cachedProducts) {
          setProducts(cachedProducts);
        }
      }
    }
  };

  const fetchCategories = async () => {
    try {
      // Hacer fetch para obtener datos actualizados
      const url = getBackendUrl('/api/categories');
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const categoriesArray = Array.isArray(json) ? json : [];

      if (categoriesArray.length > 0) {
        localStorage.setItem("categories", JSON.stringify(categoriesArray));
        setCategories(categoriesArray);
      } else if (categoriesArray.length === 0 && !categories) {
        // Si no hay categorías y no hay cache, establecer array vacío
        setCategories([]);
      }
    } catch (err: any) {
      // Si hay error pero tenemos datos en cache, mantenerlos
      if (!categories) {
        const cachedCategories = getCachedCategories();
        if (cachedCategories) {
          setCategories(cachedCategories);
        }
      }
    }
  };

  useEffect(() => {
    // Solo hacer fetch si no hay datos en cache
    // Si hay datos en cache, ya se establecieron en el estado inicial
    const hasCachedData = products !== null || categories !== null;
    
    const loadData = async () => {
      // Si no hay datos en cache, mostrar loading
      if (!hasCachedData) {
        setLoading(true);
      }
      setError("");
      try {
        await Promise.all([fetchProducts(), fetchCategories()]);
      } catch (err) {
        // Los errores ya se manejan en las funciones individuales
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const refreshCategories = async () => {
    await fetchCategories();
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        refreshProducts,
        refreshCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }
  return context;
}

