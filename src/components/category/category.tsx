import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../slice/productsSlice"
import { Link, useParams } from "react-router-dom"
import CardContainer from "../card/card"
import { Product } from "../../types/types"
import styles from "./category.module.scss"
import { CircularProgress } from "@mui/material"

const Category = () => {
    const dispatch = useDispatch<any>();
    const { category, categoryStatus } = useSelector((state: any) => state.products);
    const { categoryName } = useParams()
    const stringId = String(categoryName)
    useEffect(() => {
        dispatch(getCategory(stringId))
    }, [dispatch, stringId])
    return (
        <div className={styles.container}>
            {categoryStatus === "LOADING" ? <CircularProgress /> :
                categoryStatus === "SUCCESS" && category.map((data: Product) =>
                    <Link to={`/${data.category}/product/${data.id}`} key={data.id} className={styles.link}>
                        <CardContainer value={data.id} product={data} />
                    </Link>
                )
            }
        </div>
    )
}

export default Category;