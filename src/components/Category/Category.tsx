import { useEffect } from "react"
import { getCategory } from "../../redux/slice/productsSlice"
import { useParams } from "react-router-dom"
import CardContainer from "../Card/Card"
import { Box, CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/slice/store"
import useFilter from "../utils/useFilter"
import Filter from "../Filter/Filter"

const Category = () => {
    const dispatch = useAppDispatch();
    const { category, categoryStatus } = useAppSelector(state => state.products);
    const { sort, handleFilter, filterVal } = useFilter({ products: category })
    const { categoryName } = useParams()
    const stringId = String(categoryName)
    useEffect(() => {
        dispatch(getCategory(stringId))
    }, [dispatch, stringId])
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                width: "70%",
                height: "100%"
            }}
        >
            <Filter handleFilter={handleFilter} filterVal={filterVal} />
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: 5,
                marginTop: 2,
                width: "100%",
            }}>
                {categoryStatus === "LOADING" ? <CircularProgress /> :
                    categoryStatus === "SUCCESS" && sort && sort.map(data =>
                        <CardContainer product={data} key={data.id} />
                    )
                }
            </Box>
        </Box>
    )
}

export default Category;