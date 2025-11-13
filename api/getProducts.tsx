import { useContext, useEffect, useState, useMemo } from "react"
import { ProductsContext } from "@/contexts/products-context"

export function useGetProducts() {
    // Siempre llamar a los hooks en el mismo orden
    const context = useContext(ProductsContext)
    const url = useMemo(() => `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, [])
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        // Si hay contexto, no hacer fetch (el contexto ya lo maneja)
        if (context) {
            setLoading(context.loading)
            setResult(context.products)
            setError(context.error)
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

    // Si hay contexto, retornar los valores del contexto
    if (context) {
        return {
            loading: context.loading,
            result: context.products,
            error: context.error
        }
    }

    return { loading, result, error }
}