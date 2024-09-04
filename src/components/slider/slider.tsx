import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/store"
import { getDetailProduct, getSliderProducts } from "../slice/productsSlice";
import { Box, Button, CircularProgress } from "@mui/material";
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom";

function Slider() {
    const dispatch = useAppDispatch();
    const { sliderProducts, sliderProductsStatus } = useAppSelector(state => state.products);
    const sliderLength = sliderProducts.length
    const [currentIndex, setCurrentIndex] = useState(0)
    const [style, setStyle] = useState<styleType>({ transform: `translateX(0%)` });
    const [width, setWidth] = useState<Number>(window.innerWidth)

    const buttonStyle = {
        default: {
            borderRadius: 4,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fontSize: "2rem",
            color: "#fff",
            position: "absolute",
            "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "rgba(0,0,0,0.9)",
                transition: ".3s"
            }
        },
        right: {
            right: "1rem"
        },
        left: {
            left: "rem"
        }
    }

    useEffect(() => {
        dispatch(getSliderProducts())
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
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
        <Box
            sx={{
                display: "flex",
                overflow: "hidden",
                height: "95vh",
                width: "100%",
                position: "relative",
                alignItems: "center",
                backgroundColor: "#fff",
                boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.1)"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    transition: "transform .3s",
                }}
                style={style}
            >
                {sliderProductsStatus === "SUCCESS" ? sliderProducts.map(data =>
                    <Box
                        key={data.id}
                        onClick={() => dispatch(getDetailProduct(data.id))}
                        sx={{
                            width: `${width}px`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            ".sliderContext": {
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "#000",
                                width: "100%"
                            }
                        }}
                    >
                        <Link
                            to={`/${data.category}/product/${data.id}`}
                            className="sliderContext">
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "300px",
                                    minWidth: "150px",
                                    minHeight: "223px",
                                    maxHeight: { xs: "223px" },
                                    ".sliderImage": {
                                        width: "100%",
                                        height: "100%"
                                    }
                                }}>
                                <img src={data.image} className="sliderImage" alt={data.title} />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "1rem",
                                    overflow: "hidden",
                                    width: { lg: "50%", sm: "30%" },
                                    justifyContent: "center",
                                }}
                            >
                                <Box sx={{
                                    fontWeight: "bold",
                                    fontSize: { sm: "2rem", xs: "1.3rem" },
                                    marginBottom: "1rem"
                                }}
                                >{data.title}</Box>
                                <Box sx={{ fontSize: "1rem" }}>{data.description}</Box>
                                <Box sx={{
                                    fontWeight: "bold",
                                    margin: "10px 0 0 auto ",
                                    fontSize: { sm: "2rem", xs: "1.3rem" },
                                    color: "#ff0000"
                                }}>{data.price} $</Box>
                            </Box>
                        </Link>
                    </Box>
                ) : <CircularProgress />}
            </Box>
            <Button
                onClick={handleLeft}
                sx={[buttonStyle.default, buttonStyle.left]}
            >
                <KeyboardArrowLeftOutlined />
            </Button>
            <Button
                onClick={handleRight}
                sx={[buttonStyle.default, buttonStyle.right]}
            >
                <KeyboardArrowRightOutlined />
            </Button>
        </Box>
    )
}

export default Slider;