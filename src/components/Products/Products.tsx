import { useEffect } from "react";
import { getProducts } from "../../redux/slice/productsSlice";
import CardContainer from "../Card/Card";
import { Box, CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/slice/store";
import Filter from "../Filter/Filter";
import useFilter from "../utils/useFilter";

const Products = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.products)
    const { sort, handleFilter, filterVal } = useFilter({ products })

    useEffect(() => {
        dispatch(getProducts({}))
    }, [dispatch])

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
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 4,
                    marginTop: 2,
                    width: "100%",
                    ".link": { textDecoration: "none" }
                }}
            >
                {sort ? sort.map(data =>
                    <CardContainer product={data} key={data.id} />
                )
                    : <CircularProgress />}
            </Box>
        </Box >
    )
}

export default Products;
