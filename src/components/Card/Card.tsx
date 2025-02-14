import { Card, Typography, CardContent, CardActionArea, Rating, Box, Button } from "@mui/material"
import { Product } from "../../types/types"
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFavorite } from "../utils/useFavorite";

interface ProductType {
    product: Product
}

const CardContainer: React.FC<ProductType> = ({ product }) => {
    const { title, image, price, rating } = product;
    const { handleFavorite, favorite } = useFavorite(product)

    return (
        <Card sx={{ maxWidth: 200, ".link": { textDecoration: "none", color: "#000" } }} >
            <Link to={`/${product.category}/product/${product.id}`} key={product.id} className="link">
                <CardActionArea>
                    <Box
                        component="div"
                        sx={{
                            height: "200px",
                            backgroundPosition: "center",
                            backgroundSize: "50%",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url(${image})`
                        }}
                    ></Box>
                    <CardContent>
                        <Rating value={rating.rate} precision={0.2} readOnly sx={{ float: "right" }} />
                        <Typography
                            gutterBottom
                            variant="body2"
                            sx={{
                                width: "180px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <Typography
                component={"span"}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 1
                }}
            >
                <Button onClick={handleFavorite}>
                    {favorite !== -1 ? <Favorite /> : <FavoriteBorder />}
                </Button>
                <Box sx={{ color: "#ff0000", fontWeight: "bold" }}> {price} $</Box>
            </Typography>
        </Card >
    )
}

export default CardContainer;