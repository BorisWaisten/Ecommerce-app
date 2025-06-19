"use client"
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const Navbar = () => {
    const router = useRouter()
    const cart = useCart()
    const { lovedItems } = useLovedProducts()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 mx-auto cursor-pointer w-full transition-all duration-300 ${
            isScrolled 
                ? 'bg-white dark:bg-black shadow-lg backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95' 
                : 'bg-transparent'
        }`}>
            <h1 className={`text-3xl transition-colors duration-300 ${
                isScrolled ? 'text-black dark:text-white' : 'text-white'
            }`} onClick={() => router.push("/")}>App
                <span className="font-bold">Ecommerce</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                {cart.items.length === 0 ?
                    <ShoppingCart 
                        strokeWidth="1"
                        className={`cursor-pointer transition-colors duration-300 ${
                            isScrolled ? 'text-black dark:text-white' : 'text-white'
                        }`}
                        onClick={() => router.push("/cart")}
                    />
                    : (
                        <div className="flex gap-1 cursor-pointer" onClick={() => router.push("/cart")}>
                            <BaggageClaim 
                                strokeWidth={1} 
                                className={`cursor-pointer transition-colors duration-300 ${
                                    isScrolled ? 'text-black dark:text-white' : 'text-white'
                                }`} 
                            />
                            <span className={`transition-colors duration-300 ${
                                isScrolled ? 'text-black dark:text-white' : 'text-white'
                            }`}>{cart.items.length}</span>
                        </div>
                    )}

                <Heart
                    strokeWidth="1"
                    className={`cursor-pointer transition-colors duration-300 ${
                        isScrolled ? 'text-black dark:text-white' : 'text-white'
                    } ${lovedItems.length > 0 && (isScrolled ? 'fill-black dark:fill-white' : 'fill-white')}`}
                    onClick={() => router.push("/loved-products")} />

                <User 
                    strokeWidth={1} 
                    className={`cursor-pointer transition-colors duration-300 ${
                        isScrolled ? 'text-black dark:text-white' : 'text-white'
                    }`} 
                />

                <ToggleTheme />
            </div>
        </div>
    );
}

export default Navbar;