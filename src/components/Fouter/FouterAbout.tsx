import { Box, Typography } from "@mui/material"
import { footerAbout } from "../../style"

function FouterAbout() {
    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 2
        }}
        >
            <Box sx={footerAbout}
            >
                <Typography sx={{ fontSize: "1.5rem", margin: 1 }}>
                    ABOUT US
                </Typography>
                <Typography sx={{ color: "#4f4f4f" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. A nihil ab hic porro blanditiis alias iste delectus beatae aperiam debitis itaque numquam, consequuntur, accusamus aspernatur maiores. Earum natus error dolorum.
                    Quaerat incidunt eos dolorem beatae? Delectus quod adipisci, quibusdam porro ullam vel sint perspiciatis tempora dolor soluta. Perspiciatis, itaque nobis quas officia, mollitia maxime repudiandae magni molestias alias sequi consectetur.
                </Typography>
            </Box>
            <Box
                sx={footerAbout}
            >
                <Typography sx={{ fontSize: "1.5rem", margin: 1 }}>
                    CONTACT US
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        ".MuiTypography-root": {
                            display: "flex",
                            flexWrap: "nowrap",
                            gap: 1
                        },
                        "span": {
                            fontWeight: "bold",
                        },
                        "a": {
                            color: "#1976d2",
                            textDecoration: "none",
                        }
                    }}
                >
                    <Typography component="span">
                        Address:
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur mollitia deserunt nemo
                        </Typography>
                    </Typography>
                    <Typography component="span">
                        Phone:
                        <Typography>
                            +0 123 456 78 90
                        </Typography>
                    </Typography>
                    <Typography component="span">
                        E-mail:
                        <Typography component="a" href="mailto:email@mail.com">
                            email@mail.com
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default FouterAbout