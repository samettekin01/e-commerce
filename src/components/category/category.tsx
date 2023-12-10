import { useEffect } from "react"
import { getCategory } from "../slice/productsSlice"
import { Link, useParams } from "react-router-dom"
import CardContainer from "../card/card"
import styles from "./category.module.scss"
import { CircularProgress } from "@mui/material"
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
        <div className={styles.container}>
            {categoryStatus === "LOADING" ? <CircularProgress /> :
                categoryStatus === "SUCCESS" && category.map(data =>
                    <Link to={`/${data.category}/product/${data.id}`} key={data.id} className={styles.link}>
                        <CardContainer product={data} />
                    </Link>
                )
            }
        </div>
    )
}

export default Category;