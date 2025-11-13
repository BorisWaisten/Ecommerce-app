"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";

interface ProductsContextType {
  products: ProductType[] | null;
  categories: CategoryType[] | null;
  loading: boolean;
  error: string;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      // Primero intentar obtener de localStorage
      const cachedProducts = localStorage.getItem("products");
      if (cachedProducts) {
        try {
          const parsed = JSON.parse(cachedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        } catch (e) {
          // Si hay error parseando, continuar con fetch
        }
      }

      // Hacer fetch para obtener datos actualizados
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const productsArray = Array.isArray(json) ? json : [];

      if (productsArray.length > 0) {
        localStorage.setItem("products", JSON.stringify(productsArray));
        setProducts(productsArray);
      }
    } catch (err: any) {
      setError(err?.message || "Error al cargar productos");
      // Si hay error pero tenemos datos en cache, mantenerlos
      if (!products) {
        const cachedProducts = localStorage.getItem("products");
        if (cachedProducts) {
          try {
            const parsed = JSON.parse(cachedProducts);
            if (Array.isArray(parsed)) {
              setProducts(parsed);
            }
          } catch (e) {
            // Ignorar error de parseo
          }
        }
      }
    }
  };

  const fetchCategories = async () => {
    try {
      // Primero intentar obtener de localStorage
      const cachedCategories = localStorage.getItem("categories");
      if (cachedCategories) {
        try {
          const parsed = JSON.parse(cachedCategories);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCategories(parsed);
          }
        } catch (e) {
          // Si hay error parseando, continuar con fetch
        }
      }

      // Hacer fetch para obtener datos actualizados
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const categoriesArray = Array.isArray(json) ? json : [];

      if (categoriesArray.length > 0) {
        localStorage.setItem("categories", JSON.stringify(categoriesArray));
        setCategories(categoriesArray);
      }
    } catch (err: any) {
      // Si hay error pero tenemos datos en cache, mantenerlos
      if (!categories) {
        const cachedCategories = localStorage.getItem("categories");
        if (cachedCategories) {
          try {
            const parsed = JSON.parse(cachedCategories);
            if (Array.isArray(parsed)) {
              setCategories(parsed);
            }
          } catch (e) {
            // Ignorar error de parseo
          }
        }
      }
    }
  };

  useEffect(() => {
    // Cargar datos iniciales
    const loadData = async () => {
      setLoading(true);
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
  }, []);

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

