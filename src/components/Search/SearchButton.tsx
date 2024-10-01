import { Search } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useAppSelector } from "../utils/store"
import { Product } from "../../types/types"
import { Link } from "react-router-dom"
import { style } from "../../style"

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
            <Button >
                <Search sx={style.icon} onClick={handleSearch} />
            </Button>
            <Collapse in={isOpenSearch} orientation="horizontal" sx={style.res}>
                <TextField
                    sx={{
                        minWidth: "135px",
                        width: "100%"
                    }}
                    variant="standard"
                    placeholder="Search"
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
                            backgroundColor: "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(10px)",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            boxShadow: "10px 2px 10px 0px rgba(0, 0, 0, 0.2)",
                        }}>
                        <ListItem sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            ".link": { color: "#000", textDecoration: "none" }
                        }}>
                            {inputValue && resultSearch && resultSearch?.map((data) =>
                                <Link to={`/${data.category}/product/${data.id}`} key={data.id} className="link" onClick={() => setIsOpenSearch(false)} >
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