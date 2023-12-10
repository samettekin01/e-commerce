import { useEffect } from "react";
import { getProducts } from "../slice/productsSlice";
import { Link } from "react-router-dom";
import CardContainer from "../card/card";
import { CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../utils/store";
import Slider from "../slider/slider";
import styles from "./products.module.scss"

const Products = () => {
    const dispatch = useAppDispatch();
    const { products, productsStatus } = useAppSelector(state => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className={styles.component}>
            <Slider />
            <div className={styles.productsComponent}>
                {productsStatus === "SUCCESS" ? products.map(data =>
                    <Link to={`/${data.category}/product/${data.id}`} key={data.id} className={styles.link}>
                        <CardContainer product={data} />
                    </Link>
                )
                    : <CircularProgress />}
            </div>
        </div >
    )
}

export default Products;
