import { useEffect } from "react";
import { getDetailProduct } from "../slice/productsSlice";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography, CircularProgress, Rating, Box } from "@mui/material";
import { Product } from "../../types/types";
import { totalCalculate } from "../slice/shopSlice";
import { useAppDispatch, useAppSelector } from "../utils/store";
import { useFavorite } from "../utils/useFavorite";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const ProductDetail: React.FC = () => {
    const dispatch = useAppDispatch()
    const { productDetail, productDetailStatus } = useAppSelector<any>(state => state.products);

    const { handleFavorite, favorite } = useFavorite(productDetail)
    const { id } = useParams()
    const numberId = Number(id)

    const product: Product = {
        id: productDetail.id,
        category: productDetail.category,
        title: productDetail.title,
        price: productDetail.price,
        amount: 1,
        total: productDetail.price,
        image: productDetail.image
    }

    const addBasket = () => {
        const basketString = localStorage.getItem("basket")
        if (basketString) {
            const basket: Product[] = JSON.parse(basketString)
            const productID = basket.find(item => item.id === productDetail.id)
            if (productID && productID.amount !== undefined) {
                productID.amount += 1
                productID.total = productID.amount * product.price
            } else {
                basket.push(product)
            }
            localStorage.setItem("basket", JSON.stringify(basket))
        } else {
            localStorage.setItem("basket", JSON.stringify([product]))
        }
        dispatch(totalCalculate())
    }

    useEffect(() => {
        dispatch(getDetailProduct(numberId))
    }, [dispatch, numberId])
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
                marginBottom: 2
            }}
        >
            {productDetailStatus === "LOADING" ? <CircularProgress /> : productDetailStatus === "SUCCESS" &&
                <Card sx={{ maxWidth: 500 }}>
                    <Box
                        sx={{
                            backgroundImage: `url(${productDetail.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "50%",
                            backgroundRepeat: "no-repeat",
                            height: 350,
                        }}
                    ></Box>
                    <CardContent>
                        <Rating sx={{ float: "right" }} value={productDetail.rating.rate} precision={0.2} readOnly />
                        <Typography variant="h5" component="div">
                            {productDetail.title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {productDetail.description}
                        </Typography>
                        <Typography
                            component={"span"}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 3
                            }}>
                            <Box
                                component="span"
                                sx={{
                                    color: "#ff0000",
                                    fontSize: "1.5rem"
                                }}
                            >{productDetail.price} $</Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={addBasket}
                                >Add Basket</Button>
                                <Button onClick={handleFavorite}>
                                    {favorite !== -1 ? <Favorite /> : <FavoriteBorder />}
                                </Button>
                            </Box>
                        </Typography>
                    </CardContent>
                </Card>
            }
        </Box>
    )
}

export default ProductDetail;