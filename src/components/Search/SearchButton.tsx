import { Search } from "@mui/icons-material"
import { style } from "../navBar/navbar"
import { useEffect, useRef, useState } from "react"
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useAppSelector } from "../utils/store"
import { Product } from "../../types/types"
import { Link } from "react-router-dom"

function SearchButton() {
    const { products } = useAppSelector(state => state.products)
    const [inputValue, setInputValue] = useState<string>("")
    const [resultSearch, setResultSearch] = useState<Array<Product>>()
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false)
    const searchRef = useRef<HTMLDivElement | null>(null)

    const handleSearch = () => {
        setIsOpenSearch(true)
    }

    useEffect(() => {
        if (isOpenSearch) {
            window.addEventListener("mousedown", (e: MouseEvent) => {
                if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                    setIsOpenSearch(false)
                }
            })
            if (inputValue !== "") {
                const searchResult = products.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))
                setResultSearch(searchResult)
            } else {
                setResultSearch([])
            }
        }
    }, [isOpenSearch, products, inputValue])
    return (
        <Box sx={style.utils} ref={searchRef}>
            <Search sx={style.icon} onClick={handleSearch} />
            <Collapse in={isOpenSearch} orientation="horizontal">
                <TextField
                    sx={{
                        minWidth: "135px",
                        width: "100%"
                    }}
                    variant="standard"
                    label="Search"
                    autoFocus
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputValue(e.target.value);
                    }}
                />
                {resultSearch &&
                    <List
                        sx={{
                            display: `${isOpenSearch && inputValue ? "flex" : "none"}`,
                            position: "absolute",
                            overflow: "auto",
                            maxHeight: 300,
                            backgroundColor: "rgba(0,0,0,0.3)",
                            backdropFilter: "blur(10px)",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}>
                        <ListItem sx={{
                            display: "flex",
                            flexDirection: "column",
                            ".link": { color: "#000", textDecoration: "none" }
                        }}>
                            {inputValue && resultSearch && resultSearch?.map((data) =>
                                <Link to={`/${data.category}/product/${data.id}`} key={data.id} className="link">
                                    <ListItemButton key={data.id} sx={style.hover}>
                                        <ListItemText>{data.title}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            )}
                        </ListItem>
                    </List>
                }
            </Collapse>
        </Box >
    )
}

export default SearchButton