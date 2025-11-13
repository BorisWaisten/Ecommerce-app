import { useContext, useEffect, useState, useMemo } from "react"
import { CategoryType } from "@/types/category"
import { ProductsContext } from "@/contexts/products-context"
import { getBackendUrl } from "@/lib/utils"

export function useGetCategories() {
    // Siempre llamar a los hooks en el mismo orden
    const context = useContext(ProductsContext)
    const url = useMemo(() => getBackendUrl('/api/categories'), [])
    const [result, setResult] = useState<CategoryType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        // Si hay contexto, no hacer fetch (el contexto ya lo maneja)
        if (context) {
            setLoading(context.loading)
            setResult(context.categories)
            setError(context.error)
            return
        }
        
        // Si no hay contexto, usar el hook tradicional con localStorage
        let isMounted = true
        
        const fetchCategories = async () => {
            try {
                // Primero intentar obtener de localStorage
                const cachedCategories = localStorage.getItem('categories')
                if (cachedCategories && isMounted) {
                    try {
                        const parsed = JSON.parse(cachedCategories)
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
                    localStorage.setItem('categories', JSON.stringify(json))
                    setResult(Array.isArray(json) ? json : [])
                    setLoading(false)
                }
            } catch (error: any) {
                if (isMounted) {
                    setError(error?.message || 'Error al cargar categorías')
                    setLoading(false)
                }
            }
        }

        fetchCategories()

        return () => {
            isMounted = false
        }
    }, [url, context])

    // Si hay contexto, retornar los valores del contexto
    if (context) {
        return {
            loading: context.loading,
            result: context.categories,
            error: context.error
        }
    }

    return { loading, result, error }
}
