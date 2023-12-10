import { useEffect } from "react";
import { getProducts } from "../slice/productsSlice";
import { Link } from "react-router-dom";
import CardContainer from "../card/card";
import styles from "./products.module.scss"
import { CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../utils/store";

const Products = () => {
    const dispatch = useAppDispatch();
    const { products, productsStatus } = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className={styles.component}>
            {productsStatus === "SUCCESS" ? products.map(data =>
                <Link to={`/${data.category}/product/${data.id}`} key={data.id} className={styles.link}>
                    <CardContainer product={data} />
                </Link>
            )
                : <CircularProgress />}
        </div >
    )
}

export default Products;
