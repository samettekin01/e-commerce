import { useEffect } from "react";
import { getProducts } from "../slice/productsSlice";
import { Link } from "react-router-dom";
import CardContainer from "../card/card";
import { Box, CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../utils/store";
import Slider from "../slider/slider";

const Products = () => {
    const dispatch = useAppDispatch();
    const { products, productsStatus } = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}
        >
            <Slider />
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
                {productsStatus === "SUCCESS" ? products.map(data =>
                    <Link to={`/${data.category}/product/${data.id}`} key={data.id} className="link">
                        <CardContainer product={data} />
                    </Link>
                )
                    : <CircularProgress />}
            </Box>
        </Box >
    )
}

export default Products;
