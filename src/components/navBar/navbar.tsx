import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../slice/categoriesSlice"
import { Link } from "react-router-dom"
import { Home } from "@mui/icons-material"
import styles from "./navbar.module.scss"
import CustomizedBadges from "../shopBadge/shopBadge"

const NavBar = () => {
    const dispatch = useDispatch<any>();
    const { categories } = useSelector((state: any) => state.categories);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.link}><Home /> Home</Link>
            {categories.map((data: string, i: number) =>
                <Link to={`category/${data}`} key={i} className={styles.link}>{data}</Link>
            )}
            <Link to="/basket">
                <CustomizedBadges />
            </Link>
        </div>
    )
}

export default NavBar;