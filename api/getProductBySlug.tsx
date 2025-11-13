import { useEffect, useState } from 'react'
import { getBackendUrl } from '@/lib/utils'

export function useGetProductBySlug(slug: string | string[]) {
    const url = getBackendUrl(`/api/products/${slug}`)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)               
                const json = await res.json()                
                setResult(json)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

    return { loading, result, error }
}