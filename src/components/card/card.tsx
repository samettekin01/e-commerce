import { Card, Typography, CardContent, CardActionArea } from "@mui/material"
import { Product } from "../../types/types"
import styles from "./card.module.scss"

interface ProductType {
    product: Product
}

const CardContainer: React.FC<ProductType> = ({ product }) => {
    const { title, image, price, rating } = product;
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
                <div className={styles.picture} style={{ backgroundImage: `url(${image})` }}></div>
                <CardContent>
                    <Typography gutterBottom variant="body2" className={styles.title}>
                        {title}
                    </Typography>
                    <Typography className={styles.price}>
                        {price} $ <span className={styles.rating}>Rate: {rating.rate}</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardContainer;