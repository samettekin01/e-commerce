import { LocalShipping, Reply, SupportAgent } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { icon } from "../../style"

function FouterSupport() {
  return (
    <Box
    sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 2,
        backgroundColor: "#fff",
        ".title-header: hover": { color: "#1976d2" }
    }}
>
    <Box
        sx={{
            padding: 2,
            margin: 2
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: "2rem"
            }}
            className="title-header"
        >
            FREE SHIPPING <LocalShipping sx={icon} />
        </Box>
        <Typography
            sx={{ fontSize: "1rem" }}
        >
            Free shipping on all US order or order above $99
        </Typography>
    </Box>
    <Box
        sx={{
            padding: 2,
            margin: 2
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: "2rem"
            }}
            className="title-header"
        >
            7 / 24 SUPPORT <SupportAgent sx={icon} />
        </Box>
        <Typography
            sx={{ fontSize: "1rem" }}
        >
            Contact us 24 hours a day, 7 days a week
        </Typography>
    </Box>
    <Box
        sx={{
            padding: 2,
            margin: 2
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: "2rem"
            }}
            className="title-header"
        >
            30 DAYS RETURN <Reply sx={icon} />
        </Box>
        <Typography
            sx={{ fontSize: "1rem" }}
        >
            Simply return it within 24 days for an exchange.
        </Typography>
    </Box>
</Box>
  )
}

export default FouterSupport