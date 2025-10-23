"use client"
import { BaggageClaim, Heart, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SideLeftNav from "./side-left-nav";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import SearchBar from "./search-bar";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const router = useRouter()
    const cart = useCart()
    const { lovedItems } = useLovedProducts()
    const { user, isAuthenticated, logout } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
            isScrolled 
                ? 'bg-white dark:bg-black shadow-lg backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95' 
                : 'bg-transparent'
        }`}>
            <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
                {/* Sección izquierda: Logo + Navegación */}
                <div className="flex items-center gap-6">
                    <h1 className={`text-3xl transition-colors duration-300 cursor-pointer ${
                        isScrolled ? 'text-black dark:text-white' : 'text-white'
                    }`} onClick={() => router.push("/")}>App
                        <span className="font-bold">Ecommerce</span>
                    </h1>
                    
                    {/* Navegación lateral - Solo en desktop */}
                    <div className="hidden lg:block">
                        <SideLeftNav isScrolled={isScrolled} />
                    </div>
                </div>

                {/* Sección derecha: Búsqueda + Acciones */}
                <div className="flex items-center gap-4">
                    {/* Búsqueda - Solo en desktop */}
                    <div className="hidden sm:block">
                        <SearchBar isScrolled={isScrolled} />
                    </div>

                    {/* Acciones del usuario */}
                    <div className="flex items-center gap-2 sm:gap-4">
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

                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`p-0 h-auto w-auto hover:bg-transparent ${
                                            isScrolled ? 'text-black dark:text-white' : 'text-white'
                                        }`}
                                    >
                                        <User 
                                            strokeWidth={1} 
                                            className="cursor-pointer transition-colors duration-300" 
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="px-2 py-1.5 text-sm font-medium">
                                        {user?.name}
                                    </div>
                                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                                        {user?.email}
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Mi Perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Cerrar Sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`p-0 h-auto w-auto hover:bg-transparent ${
                                    isScrolled ? 'text-black dark:text-white' : 'text-white'
                                }`}
                                onClick={() => router.push("/auth")}
                            >
                                <User 
                                    strokeWidth={1} 
                                    className="cursor-pointer transition-colors duration-300" 
                                />
                            </Button>
                        )}

                        <ToggleTheme />
                    </div>
                </div>

                {/* Menú móvil */}
                <div className="flex lg:hidden">
                    <ItemsMenuMobile />
                </div>
            </div>
        </div>
    );
}

export default Navbar;