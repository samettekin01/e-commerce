import { useEffect, useState } from "react"
import { Product } from "../../types/types"
import { ListItem, Avatar, List, ListItemAvatar, ListItemText, Typography, IconButton, Alert } from '@mui/material'
import { Delete } from "@mui/icons-material"
import { grandTotal, totalCalculate } from "../slice/shopSlice"
import styles from "./basket.module.scss"
import { useAppDispatch, useAppSelector } from "../utils/store"


const Basket: React.FC = () => {
    const [basket, setBasket] = useState<Product[]>();
    const grandT = useAppSelector(state => state.shop.grandTotal);
    const dispatch = useAppDispatch();
    const basketString = localStorage.getItem("basket");

    useEffect(() => {
        if (basketString) {
            const getBasket = JSON.parse(basketString);
            setBasket(getBasket);
            dispatch(grandTotal());
            dispatch(totalCalculate());
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
    return (
        <div className={styles.container}>
            <List sx={{
                width: '100%',
                maxWidth: 700,
                minWidth: 300,
                bgcolor: "background.paper"
            }}>
                {basket && basket.map(data =>
                    <div key={data.id}>
                        <ListItem alignItems="center">
                            <ListItemText
                                sx={{ minWidth: 25 }}
                                secondary={
                                    <Typography>
                                        {data.amount}
                                    </Typography>
                                }
                            />
                            <ListItemAvatar>
                                <Avatar
                                    alt={data.title}
                                    src={data.image}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    width: "50%",
                                    minWidth: 150,
                                    float: "left"
                                }}
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {data.title}
                                    </Typography>
                                }
                            />
                            <ListItemText
                                sx={{
                                    minWidth: 50,
                                    float: "right"
                                }}
                                secondary={
                                    <Typography>
                                        {data.total} $
                                    </Typography>
                                }
                            />
                            <IconButton onClick={() => productDelete(data.id)}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                    </div>
                )}
                {grandT !== 0 ? <Typography sx={{
                    float: "right",
                    marginRight: 2
                }}>
                    Total: {Math.floor((grandT) * 100) / 100} $
                </Typography> : <Alert severity="info">Not found product</Alert>}
            </List>
        </div>
    )
}

export default Basket;