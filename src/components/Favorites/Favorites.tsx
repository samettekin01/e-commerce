import { useCallback, useEffect, useState } from "react"
import { Product } from "../../types/types"
import CardContainer from "../card/card"
import { Box } from "@mui/material"

function Favorites() {
    const [favorites, setFavorites] = useState<Array<Product>>()
    const getFavorites = useCallback(() => {
        const getList = JSON.parse(localStorage.getItem("favorites") || '""') || []
        setFavorites(getList)
    }, [])

    useEffect(() => {
        getFavorites()
    }, [getFavorites])
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "space-around"
            }}>
            {favorites ? favorites.map(data => <CardContainer product={data} key={data.id} />) : "No Favorites"}
        </Box>
    )
}

export default Favorites