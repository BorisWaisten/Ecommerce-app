import { useContext, useEffect, useState, useMemo } from "react"
import { ProductsContext } from "@/contexts/products-context"
import { ProductType } from "@/types/product"
import { getBackendUrl } from "@/lib/utils"

export function useGetProducts() {
    // Siempre llamar a los hooks en el mismo orden
    const context = useContext(ProductsContext)
    const url = useMemo(() => getBackendUrl('/api/products'), [])
    const [result, setResult] = useState<ProductType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Si hay contexto, usar los valores del contexto directamente
    useEffect(() => {
        if (context) {
            setLoading(context.loading)
            setResult(context.products)
            setError(context.error)
        }
    }, [context?.loading, context?.products, context?.error, context])

    useEffect(() => {
        // Si hay contexto, no hacer fetch (el contexto ya lo maneja)
        if (context) {
            return
        }
        
        // Si no hay contexto, usar el hook tradicional con localStorage
        let isMounted = true
        
        const fetchProducts = async () => {
            try {
                // Primero intentar obtener de localStorage
                const cachedProducts = localStorage.getItem('products')
                if (cachedProducts && isMounted) {
                    try {
                        const parsed = JSON.parse(cachedProducts)
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            setResult(parsed)
                            setLoading(false)
                        }
                    } catch (e) {
                        // Si hay error parseando, continuar con fetch
                    }
                }

                setError('')
                
                const res = await fetch(url)
                
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`)
                }
                
                const json = await res.json()
                
                if (isMounted) {
                    localStorage.setItem('products', JSON.stringify(json))
                    setResult(Array.isArray(json) ? json : [])
                    setLoading(false)
                }
            } catch (error: any) {
                if (isMounted) {
                    setError(error?.message || 'Error al cargar productos')
                    setLoading(false)
                }
            }
        }

        fetchProducts()

        return () => {
            isMounted = false
        }
    }, [url, context])

    // Si hay contexto, retornar los valores del contexto directamente
    if (context) {
        return {
            loading: context.loading,
            result: context.products,
            error: context.error
        }
    }

    return { loading, result, error }
}