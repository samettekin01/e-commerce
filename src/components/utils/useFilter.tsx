import { useEffect, useState } from "react"
import { Product } from "../../types/types"
import { SelectChangeEvent } from "@mui/material";

function useFilter({ products }: { products?: Product[] }) {

    const [sort, setSort] = useState<Product[]>([])
    const [filterVal, setFilterVal] = useState<number>(1);

    const handleFilter = (e: SelectChangeEvent<number>) => {
        if (products) {
            const filterValue = Number(e.target.value)
            setFilterVal(filterValue)
            let sortedProducts: Product[] = []
            switch (filterValue) {
                case 2:
                    sortedProducts = [...products].sort((a, b) => {
                        if (a.price < b.price) return -1
                        return 0
                    })
                    setSort(sortedProducts)
                    break
                case 3:
                    sortedProducts = [...products].sort((a, b) => {
                        if (a.price > b.price) return -1
                        return 0
                    })
                    setSort(sortedProducts)
                    break
                case 4:
                    sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title))
                    setSort(sortedProducts)
                    break
                case 5:
                    sortedProducts = [...products].sort((a, b) => { return b.title.localeCompare(a.title) })
                    setSort(sortedProducts)
                    break
                default:
                    setSort(products)
            }
        }
    }

    useEffect(() => {
        if (filterVal === 1 && products) {
            setSort(products)
        }
    }, [filterVal, products])
    return { handleFilter, sort, filterVal }
}

export default useFilter