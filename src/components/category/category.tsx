import { useEffect } from "react"
import { getCategory } from "../slice/productsSlice"
import { useParams } from "react-router-dom"
import CardContainer from "../card/card"
import { Box, CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../utils/store"

const Category = () => {
    const dispatch = useAppDispatch();
    const { category, categoryStatus } = useAppSelector(state => state.products);
    const { categoryName } = useParams()
    const stringId = String(categoryName)
    useEffect(() => {
        dispatch(getCategory(stringId))
    }, [dispatch, stringId])
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: 5,
                marginTop: 2,
                width: "100%",
                ".link": { textDecoration: "none" }
            }}
        >
            {categoryStatus === "LOADING" ? <CircularProgress /> :
                categoryStatus === "SUCCESS" && category.map(data =>
                    <CardContainer product={data} key={data.id} />
                )
            }
        </Box>
    )
}

export default Category;