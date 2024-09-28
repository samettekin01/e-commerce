import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../utils/store"
import { getDetailProduct, getSliderProducts } from "../slice/productsSlice"
import { Box, Button, CircularProgress } from "@mui/material"
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom"

function Slider() {
    const dispatch = useAppDispatch()
    const { sliderProducts, sliderProductsStatus } = useAppSelector(state => state.products)
    const sliderLength = sliderProducts.length

    const [currentIndex, setCurrentIndex] = useState(0)

    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const minSwipeDistance = 50

    const [isActive, setIsActive] = useState<boolean>(true)

    const [style, setStyle] = useState<styleType>({ transform: `translateX(0%)` })
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

    interface styleType {
        transform: string
    }

    const handleLeft = () => {
        setIsActive(false)
        setCurrentIndex((currentIndex - 1 + sliderLength) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex - 1 + sliderLength) % sliderLength * 20}%)`
        }))
        setTimeout(() => {
            setIsActive(true);
        }, 2000);
    }

    const handleRight = useCallback(() => {
        setIsActive(false)
        setCurrentIndex((currentIndex + 1) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex + 1) % sliderLength * 20}%)`
        }))
        setTimeout(() => {
            setIsActive(true);
        }, 2000);
    }, [currentIndex, sliderLength])

    const onTouchStart = (e: any) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: any) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (touchStart - touchEnd < -minSwipeDistance) {
            handleLeft()
        }

        if (touchStart - touchEnd > minSwipeDistance) {
            handleRight()
        }
    }

    useEffect(() => {
        dispatch(getSliderProducts())
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
    }, [dispatch])

    useEffect(() => {
        let timeOut: ReturnType<typeof setInterval> | null = null
        if (isActive) {
            timeOut = setInterval(handleRight, 5000)
        } else {
            timeOut !== null && clearInterval(timeOut)
        }
        return () => {
            if (timeOut !== null) {
                clearInterval(timeOut);
            }
        }
    }, [isActive, handleRight])

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
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
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
                ) :
                    <Box sx={{ display: "flex", width: `${width}px`, justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                }
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

export default Slider