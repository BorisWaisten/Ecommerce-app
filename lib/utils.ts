import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Construye una URL del backend sin doble slash
 * @param endpoint - El endpoint de la API (ej: '/api/products' o 'api/products')
 * @returns La URL completa sin doble slash
 */
export function getBackendUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
  // Remover trailing slash del baseUrl y leading slash del endpoint
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '')
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${cleanBaseUrl}${cleanEndpoint}`
}
