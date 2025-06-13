import { useEffect, useState } from "react"

export function useGetProducts() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                localStorage.setItem('products', JSON.stringify(json))
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