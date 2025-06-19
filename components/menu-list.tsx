"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { useGetCategories } from "@/api/getCategories"
import { CategoryType } from "@/types/category"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const MenuList = () => {
    const { result: categories, loading } = useGetCategories()

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {loading && (
                                <li className="col-span-2 text-center">
                                    <p>Cargando categorías...</p>
                                </li>
                            )}
                            {!loading && categories && categories.length > 0 && categories.map((category: CategoryType) => (
                                <ListItem
                                    key={category._id}
                                    title={category.categoryName}
                                    href={`/category/${category.slug}`}
                                >
                                    Explora productos de {category.categoryName}
                                </ListItem>
                            ))}
                            {!loading && (!categories || categories.length === 0) && (
                                <li className="col-span-2 text-center">
                                    <p>No hay categorías disponibles</p>
                                </li>
                            )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default MenuList

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


