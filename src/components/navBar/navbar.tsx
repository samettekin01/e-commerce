import { useEffect } from "react"
import { getCategories } from "../slice/categoriesSlice"
import { Link } from "react-router-dom"
import { Home } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import CustomizedBadges from "../shopBadge/shopBadge"
import { useAppDispatch, useAppSelector } from "../utils/store"

const NavBar = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(state => state.categories);

    const style = {
        "& .link": {
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            gap: 1,
            color: "#000",
            fontSize: "1rem",
            borderRadius: 1,
            padding: 1
        },
        "&:hover": { backgroundColor: "#000" },
        "&:hover .link": { color: "#fff" }
    }

    const popupStyle = {
        display: "flex",
        textDecoration: "none",
        gap: 1,
        color: "#000",
        fontSize: "1rem",
        borderRadius: 1,
        padding: 2,
        "&:hover": { backgroundColor: "#000", color: "#fff" }
    }

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "center" },
                position: "sticky",
                backgroundColor: "#fff",
                top: 0,
                width: "100%",
                fontSize: "1.3rem",
                boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.1)",
                zIndex: 1
            }}>
            <Box
                sx={{
                    display: { sm: "none", xs: "block" }, margin: "5px auto 5px 5px",
                    ".link": {
                        display: "flex",
                        alignItems: "center",
                        color: "#000",
                        padding: 2,
                        textDecoration: "none"
                    },
                    "&:hover .link": { backgroundColor: "#000" }
                }}
            >
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                            <Button variant="outlined" {...bindTrigger(popupState)}>
                                <MenuIcon />
                            </Button>
                            <Menu {...bindMenu(popupState)} sx={{"& .link": {textDecoration: "none"}}}>
                                <Link to="/" className="link">
                                    <MenuItem onClick={popupState.close} sx={popupStyle}><Home />Home</MenuItem>
                                </Link>
                                {categories.map((data: string, i: number) =>
                                    <Link to={`category/${data}`} key={i} className="link">
                                        <MenuItem onClick={popupState.close} sx={popupStyle}>{data}</MenuItem>
                                    </Link>
                                )}
                            </Menu>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { sm: "flex", xs: "none" }, alignItems: "center" }}>
                <Button sx={style}>
                    <Link to="/" className="link" ><Home /> Home</Link>
                </Button>
                {categories.map((data: string, i: number) =>
                    <Button key={i} sx={style} >
                        <Link to={`category/${data}`} className="link">{data}</Link>
                    </Button>
                )}
            </Box>
            <Box sx={{ display: "flex", margin: 1 }}>
                <Link to="/basket">
                    <CustomizedBadges />
                </Link>
            </Box>
        </Box>
    )
}

export default NavBar;