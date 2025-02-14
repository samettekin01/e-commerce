import { useEffect } from "react";
import { getDetailProduct } from "../../redux/slice/productsSlice";
import { useParams } from "react-router-dom";
import { Button, Typography, CircularProgress, Rating, Box } from "@mui/material";
import { Product } from "../../types/types";
import { totalCalculate } from "../../redux/slice/shopSlice";
import { useAppDispatch, useAppSelector } from "../../redux/slice/store";
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
                marginBottom: 2,
                backgroundColor: "#fff"
            }}
        >
            {productDetailStatus === "LOADING" ? <CircularProgress /> : productDetailStatus === "SUCCESS" &&
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center" },
                    margin: { xs: "0", md: "0 100px" },
                    padding: { xs: 5, md: 10 }
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%"
                    }}>
                        <img
                            src={productDetail.image}
                            style={{
                                minWidth: 200,
                                maxWidth: 250
                            }}
                            alt={productDetail.title}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 1,
                        width: { xs: "100%", md: "50%" },
                        height: "100%"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}>
                            <Typography variant="h5" component="div">
                                {productDetail.title}
                            </Typography>
                            <Rating value={productDetail.rating.rate} precision={0.2} readOnly />
                            <Box
                                component="span"
                                sx={{
                                    color: "#000",
                                    fontSize: "2rem",
                                    fontWeight: "bold"
                                }}
                            >{productDetail.price} $</Box>
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                    marginTop: 2,
                                    borderBottom: 1,
                                    borderBottomColor: "rgba(0,0,0,0.5)"
                                }}
                            >
                                Description
                            </Typography>
                            <Typography component="span" sx={{ color: "rgb(107, 114, 128, 0.9)" }}>
                                {productDetail.description}
                            </Typography>
                        </Box>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Button
                                variant="contained"
                                onClick={addBasket}
                            >Add Basket</Button>
                            <Button onClick={handleFavorite}>
                                {favorite !== -1 ? <Favorite /> : <FavoriteBorder />}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default ProductDetail;