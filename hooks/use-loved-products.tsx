import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from "@/types/product";
import { toast } from '@/components/ui/use-toast'

interface UseLovedProductsType {
    lovedItems: ProductType[],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (_id: number) => void
}

export const useLovedProducts = create(persist<UseLovedProductsType>((set, get) => ({
    lovedItems: [],
    addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item._id === data._id)

        if (existingItem) {
            return toast({
                title: "El producto ya existe en la lista 💔",
                variant: "destructive"
            })
        }

        set({
            lovedItems: [...get().lovedItems, data]
        })
        toast({
            title: " Producto añadido a la lista 🧡"
        })
    },
    removeLovedItem: (_id: number) => {
        set({ lovedItems: [...get().lovedItems.filter((item) => item._id !== _id)] })
        toast({
            title: "Producto se ha eliminado de la lista ❤️‍🔥"
        })
    }
}), {
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))