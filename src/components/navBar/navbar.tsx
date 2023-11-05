import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../slice/categoriesSlice"
import { Link } from "react-router-dom"
import { Home } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import { Button, Menu, MenuItem } from "@mui/material"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import CustomizedBadges from "../shopBadge/shopBadge"
import styles from "./navbar.module.scss"

const NavBar = () => {
    const dispatch = useDispatch<any>();
    const { categories } = useSelector((state: any) => state.categories);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    return (
        <div className={styles.container}>
            <div className={styles.popoverMenu}>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                            <Button variant="outlined" {...bindTrigger(popupState)}>
                                <MenuIcon />
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <Link to="/" className={styles.link}>
                                    <Home /><MenuItem onClick={popupState.close}>Home</MenuItem>
                                </Link>
                                {categories.map((data: string, i: number) =>
                                    <Link to={`category/${data}`} key={i} className={styles.link}>
                                        <MenuItem onClick={popupState.close}>{data}</MenuItem>
                                    </Link>
                                )}
                            </Menu>
                        </>
                    )}
                </PopupState>
            </div>
            <div className={styles.navbar}>
                <Link to="/" className={styles.link}><Home /> Home</Link>
                {categories.map((data: string, i: number) =>
                    <Link to={`category/${data}`} key={i} className={styles.link}>{data}</Link>
                )}
            </div>
            <Link to="/basket" className={styles.badges}>
                <CustomizedBadges />
            </Link>
        </div>
    )
}

export default NavBar;