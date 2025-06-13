import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '@/components/ui/use-toast'

import { ProductType } from "@/types/product"

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (_id: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {
       
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item._id === data._id)

        if (existingItem) {
            return toast({
                title: "El producto ya existe en el carrito.",
                variant: "destructive"
            })
        }

        set({
            items: [...get().items, data]
        })
        toast({
            title: "Producto añadido al carrito 🛍️"
        })
    },
    removeItem: (_id: number) => {
        set({ items: [...get().items.filter((item) => item._id !== _id)] })
        toast({
            title: "Producto eliminado del carrito 🗑️"
        })
    },

    removeAll: () => set({ items: [] })
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))

