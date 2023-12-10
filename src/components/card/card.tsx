import { Card, Typography, CardContent, CardActionArea, Rating } from "@mui/material"
import { Product } from "../../types/types"
import styles from "./card.module.scss"

interface ProductType {
    product: Product
}

const CardContainer: React.FC<ProductType> = ({ product }) => {
    const { title, image, price, rating } = product;
    return (
        <Card sx={{ maxWidth: 200 }} >
            <CardActionArea>
                <div className={styles.picture} style={{ backgroundImage: `url(${image})` }}></div>
                <CardContent>
                    <Typography gutterBottom variant="body2" className={styles.title}>
                        {title}
                    </Typography>
                    <Typography className={styles.values} component={"span"}>
                        <span className={styles.price}> {price} $</span>
                        <Rating value={rating.rate} precision={0.2} readOnly />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardContainer;