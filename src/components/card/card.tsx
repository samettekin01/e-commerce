import { Card, Typography, CardContent, CardActionArea, Rating, Box } from "@mui/material"
import { Product } from "../../types/types"

interface ProductType {
    product: Product
}

const CardContainer: React.FC<ProductType> = ({ product }) => {
    const { title, image, price, rating } = product;
    return (
        <Card sx={{ maxWidth: 200 }} >
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
                    <Typography
                        component={"span"}

                    >
                        <Box sx={{ color: "#ff0000", fontWeight: "bold", marginLeft: "auto", marginBottom: 2, float: "right" }}> {price} $</Box>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    )
}

export default CardContainer;