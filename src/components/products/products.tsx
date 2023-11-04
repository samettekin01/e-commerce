import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slice/productsSlice";
import { Link } from "react-router-dom";
import { Product } from "../../types/types";
import CardContainer from "../card/card";
import styles from "./products.module.scss"
import { CircularProgress } from "@mui/material"

const Products = () => {
    const dispatch = useDispatch<any>();
    const { products, productsStatus } = useSelector((state: any) => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className={styles.component}>
            {productsStatus === "SUCCESS" ? products.map((data: Product) =>
                <Link to={`/${data.category}/product/${data.id}`} key={data.id} className={styles.link}>
                    <CardContainer value={data.id} product={data} />
                </Link>
            )
                : <CircularProgress />}
        </div >
    )
}

export default Products;
