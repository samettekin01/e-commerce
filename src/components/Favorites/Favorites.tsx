import { useCallback, useEffect, useState } from "react"
import { Product } from "../../types/types"
import CardContainer from "../Card/Card"
import { Alert, Box } from "@mui/material"

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
                justifyContent: "space-around",
                margin: 2
            }}>
            {favorites && favorites.length > 0 ? favorites.map(data => <CardContainer product={data} key={data.id} />) :
                <Box sx={{width: "100%", height: "100%"}}>
                    <Alert severity="info">Not found favorite</Alert>
                </Box>
            }
        </Box>
    )
}

export default Favorites