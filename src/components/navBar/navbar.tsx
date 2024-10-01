import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ExitToApp, Favorite, Home, Person, Token } from "@mui/icons-material"
import { Avatar, Box, Button, Menu, MenuItem, Tooltip } from "@mui/material"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import MenuIcon from "@mui/icons-material/Menu"
import { useAppDispatch, useAppSelector } from "../utils/store"
import { getCategories } from "../slice/categoriesSlice"
import { singUpStatus } from "../slice/statusSlice"
import CustomizedBadges from "../shopBadge/shopBadge"
import SearchButton from "../Search/SearchButton"
import { popupStyle, style } from "../../style"


const NavBar = () => {
    const getUser = JSON.parse(localStorage.getItem("user") || '""')
    const [user, setUser] = useState<boolean>(false)
    const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null)
    const open = Boolean(isOpenMenu)

    const dispatch = useAppDispatch()

    const { categories } = useAppSelector(state => state.categories)
    const { categoryName } = useParams()

    const handleSignUp = () => {
        if (!getUser) {
            dispatch(singUpStatus())
            getUser && setUser(true)
        } else {
            localStorage.removeItem("user")
            setUser(false)
            setIsOpenMenu(null)
        }
    }

    const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenMenu(e.currentTarget)
    }

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    useEffect(() => {
        if (getUser) {
            setUser(true)
        }
    }, [getUser])

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "flex-start" },
                alignItems: "center",
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
                    display: { md: "none", xs: "flex" }, margin: "5px",
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
                            <Button {...bindTrigger(popupState)}>
                                <MenuIcon sx={{color: "#000"}} />
                            </Button>
                            <Menu {...bindMenu(popupState)} sx={{ "& .link": { textDecoration: "none" } }}>
                                <Link to="/" className="link">
                                    <MenuItem onClick={popupState.close} sx={popupStyle}>Home <Home /></MenuItem>
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
            <Box
                sx={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "10px"
                }}
            >
                <Link to="/" style={{
                    display: "flex",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: "bold"
                }}>
                    <Token /><Box sx={{ display: { sm: "flex", xs: "none" } }}>eCom</Box>
                </Link>
            </Box>
            <Box sx={{ display: { md: "flex", xs: "none" }, alignItems: "center", justifyContent: "center", width: "80%" }}>
                <Button
                    sx={style.menu}
                    style={{ backgroundColor: categoryName === undefined ? "#000" : "" }} >
                    <Link to="/" className="link" style={{ color: categoryName === undefined ? "#fff" : "" }} ><Home /> Home</Link>
                </Button>
                {categories.map((data: string, i: number) =>
                    <Button
                        key={i}
                        sx={style.menu}
                        style={{
                            backgroundColor: categoryName === data ? "#000" : ""
                        }} >
                        <Link to={`category/${data}`} className="link" style={{ color: categoryName === data ? "#fff" : "" }}>{data}</Link>
                    </Button>
                )}
            </Box>
            <Box sx={style.utils} style={{ marginLeft: "auto" }}>
                <Tooltip title="Search" placement="bottom">
                    <Box style={style.res}>
                        <SearchButton />
                    </Box>
                </Tooltip>
                <Box>
                    {user ?
                        <Tooltip title="SignOut" id="user-button">
                            <Button onClick={handleOpenMenu}>
                                <Avatar sx={{ bgcolor: "#ff6800" }}>{getUser.name !== "" ? getUser.name.slice(0, 1) : "A"}</Avatar>
                            </Button>
                        </Tooltip>
                        :
                        <Tooltip title="SignIn/SignUp" placement="bottom">
                            <Button onClick={handleSignUp}>
                                <Person sx={style.icon} />
                            </Button>
                        </Tooltip>
                    }
                    <Menu
                        id="basic-menu"
                        open={open}
                        anchorEl={isOpenMenu}
                        onClose={() => setIsOpenMenu(null)}
                    >
                        <MenuItem onClick={handleSignUp} sx={{ gap: 2 }}>SignOut <ExitToApp /></MenuItem>
                    </Menu>
                </Box>
                <Box>
                    <Tooltip title="Favorite(s)" placement="bottom">
                        <Button sx={{ ".link": { display: "flex", alignItems: "center" } }}>
                            <Link to="/favorites" className="link">
                                <Favorite sx={style.icon} />
                            </Link>
                        </Button>
                    </Tooltip>
                </Box>
                <Tooltip title="Basket" placement="bottom">
                    <Link to="/basket" style={style.utils}>
                        <CustomizedBadges />
                    </Link>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default NavBar