import { ResultFilterTypes } from "@/types/filters"
import { useEffect, useState } from "react"
import { getBackendUrl } from "@/lib/utils"

export function useGetProductField() {
    const url = getBackendUrl('/api/content-type-builder/content-types/api::producto.producto')
    const [result, setResult] = useState<ResultFilterTypes | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json.data)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

    return { loading, result, error }
}