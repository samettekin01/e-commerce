import { useEffect, useState } from "react"
import { Product } from "../../types/types"
import {
    Avatar, ListItemAvatar, Typography, IconButton,
    Alert, Button, TableContainer, Paper, TableBody,
    TableRow, TableHead, TableCell, Table, Box
} from '@mui/material'
import { ArrowLeft, ArrowRight, Delete } from "@mui/icons-material"
import { grandTotal, totalCalculate } from "../slice/shopSlice"
import { useAppDispatch, useAppSelector } from "../utils/store"


const Basket: React.FC = () => {
    const [basket, setBasket] = useState<Product[]>()
    const grandT = useAppSelector(state => state.shop.grandTotal)
    const dispatch = useAppDispatch()
    const basketString = localStorage.getItem("basket")

    useEffect(() => {
        if (basketString) {
            const getBasket = JSON.parse(basketString)
            setBasket(getBasket)
            dispatch(grandTotal())
            dispatch(totalCalculate())
        }
    }, [basketString, dispatch])

    const productDelete = (id: number) => {
        if (basketString) {
            const getBasket: Product[] = JSON.parse(basketString)
            const index = getBasket.findIndex(item => item.id === id)
            getBasket.splice(index, 1)
            localStorage.setItem("basket", JSON.stringify(getBasket))
            setBasket(getBasket)
            dispatch(totalCalculate())
            dispatch(grandTotal())
        }
    }
    if (basket?.findIndex(item => item.id > 0) === -1) {
        localStorage.removeItem("basket")
    }

    const basketDone = () => {
        if (basketString) {
            localStorage.removeItem("basket")
            setBasket([])
            dispatch(totalCalculate())
            dispatch(grandTotal())
        }
    }

    const increment = (id: number) => {
        const getBasket = basketString && JSON.parse(basketString)
        if (basket) {
            const product = basket?.find(item => item.id === id)
            if (product && product.amount !== undefined) {
                product.amount += 1
                product.total = product.amount * product.price
            }
            localStorage.setItem("basket", JSON.stringify(basket))
            dispatch(totalCalculate())
            setBasket(getBasket)
        }
    }
    const decrement = (id: number) => {
        const getBasket = basketString && JSON.parse(basketString)
        if (basket) {
            const product = basket?.find(item => item.id === id)
            if (product && product.amount !== undefined && product.amount !== 1) {
                product.amount -= 1
                product.total = product.amount * product.price
            }
            localStorage.setItem("basket", JSON.stringify(basket))
            dispatch(totalCalculate())
            setBasket(getBasket)
        }
    }
    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            marginTop: 2
        }}>
            <TableContainer
                component={Paper}
                sx={{
                    display: `${basket?.length ? "flex" : "none"}`,
                    justifyContent: "center",
                    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.1)"
                }} >
                <Table
                    sx={{
                        maxWidth: 750,
                        display: "table",
                        tableLayout: "fixed",
                        width: "100%"
                    }}>
                    <TableHead sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket && basket.map(data =>
                            <TableRow key={data.id}>
                                <TableCell sx={{ minWidth: 25 }} align="center">
                                    <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <IconButton onClick={() => decrement(data.id)} >
                                            <ArrowLeft />
                                        </IconButton>
                                        {data.amount}
                                        <IconButton onClick={() => increment(data.id)}>
                                            <ArrowRight  />
                                        </IconButton>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="square"
                                            sx={{ width: "100%", height: "100%", marginRight: "10px" }}
                                            alt={data.title}
                                            src={data.image}
                                        />
                                    </ListItemAvatar>
                                </TableCell>
                                <TableCell align="left">
                                    {data.title}
                                </TableCell>
                                <TableCell align="center">
                                    {data.total && Math.floor((data.total) * 100) / 100} $
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => productDelete(data.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {basket?.length ? grandT !== 0 && <Typography sx={{ marginLeft: "auto", marginRight: { xs: 10, md: "25%" }, marginTop: "20px", marginBottom: "20px" }}>
                <Typography sx={{ fontSize: "1.3rem" }}>
                    <Box component="span" sx={{ fontWeight: "bold" }}>Total:</Box> {Math.floor((grandT) * 100) / 100} $
                </Typography>
                <Typography>
                    <Button sx={{ marginLeft: 9 }} variant="contained" onClick={basketDone}>Done</Button>
                </Typography>
            </Typography> : <Alert severity="info">Not found product</Alert>}
        </Box >
    )
}

export default Basket