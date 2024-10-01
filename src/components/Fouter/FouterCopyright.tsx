import { Box, Typography } from "@mui/material"
import img from "../../assets/payment.jpg"
import { Link } from "react-router-dom"

function FouterCopyright() {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 1,
                padding: 1,
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#fff"
            }}
        >
            <Typography
                sx={{ fontSize: ".8rem" }}
            >
                <Link
                    to="https://github.com/samettekin01"
                    target="_blank"
                    style={{ color: "#4f4f4f", textDecoration: "none" }}
                >
                    PatroSam ©2024 Made with by PatroSam
                </Link>
            </Typography>
            <img src={img} alt="pay" />
        </Box>
    )
}

export default FouterCopyright