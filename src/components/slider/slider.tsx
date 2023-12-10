import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/store"
import { getDetailProduct, getSliderProducts } from "../slice/productsSlice";
import { CircularProgress } from "@mui/material";
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";
import styles from "./slider.module.scss"

function Slider() {
    const dispatch = useAppDispatch();
    const { sliderProducts, sliderProductsStatus } = useAppSelector(state => state.products);
    const sliderLength = sliderProducts.length
    const [currentIndex, setCurrentIndex] = useState(0)
    const [style, setStyle] = useState<styleType>({ transform: `translateX(0%)` });

    useEffect(() => {
        dispatch(getSliderProducts())
    }, [dispatch])

    interface styleType {
        transform: string
    }

    const handleLeft = () => {
        setCurrentIndex((currentIndex - 1 + sliderLength) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex - 1 + sliderLength) % sliderLength * 20}%)`
        }));
    }

    const handleRight = () => {
        setCurrentIndex((currentIndex + 1) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex + 1) % sliderLength * 20}%)`
        }));
    }
    return (
        <div className={styles.component}>
            <div className={styles.sliderComponent} style={style}>
                {sliderProductsStatus === "SUCCESS" ? sliderProducts.map(data =>
                    <div key={data.id} onClick={() => dispatch(getDetailProduct(data.id))}>
                        <Link to={`/${data.category}/product/${data.id}`} className={styles.sliderContext}>
                            <div className={styles.ImageContext}>
                                <img src={data.image} className={styles.sliderImage} alt={data.title} />
                                <span className={styles.sliderTitle}>{data.title}</span>
                            </div>
                            <div className={styles.sliderDescription}>
                                <span className={styles.description}>{data.description}</span>
                                <span className={styles.price}>{data.price} $</span>
                            </div>
                        </Link>
                    </div>
                ) : <CircularProgress />}
            </div>
            <button onClick={handleLeft} className={styles.sliderLeftButton}><KeyboardArrowLeftOutlined /></button>
            <button onClick={handleRight} className={styles.sliderRightButton}><KeyboardArrowRightOutlined /></button>
        </div>
    )
}

export default Slider;