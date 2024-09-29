import { useCallback, useEffect, useState } from "react"
import { Product } from "../../types/types"

export function useFavorite(product: Product) {
    const [favorite, setFavorite] = useState()

    const handleFavorite = () => {
        const getFav = JSON.parse(localStorage.getItem("favorites") || '""') || []
        const productList: Product = product || []
        const findProduct = getFav.findIndex((item: Product) => item.id === product.id)
        if (!getFav && getFav[0] === null) {
            localStorage.setItem("favorites", JSON.stringify(product))
        } else if (findProduct === -1) {
            getFav && getFav.push(productList)
            localStorage.setItem("favorites", JSON.stringify(getFav))
        } else {
            getFav.splice(findProduct, 1)
            localStorage.setItem("favorites", JSON.stringify(getFav))
        }
        favoriteStatus()
    }

    const favoriteStatus = useCallback(() => {
        const getList = JSON.parse(localStorage.getItem("favorites") || '""') || []
        if (getList) {
            setFavorite(getList.findIndex((item: Product) => item.id === product.id))
        }
    }, [product.id])

    useEffect(() => {
        favoriteStatus()
    }, [favoriteStatus])
    return { handleFavorite, favorite }
}