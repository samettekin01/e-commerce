import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'

function FouterContact() {
    const gotoUrl = () => {
        window.open("https://github.com/samettekin01")
    }
    return (
        <Box
            sx={{
                display: "flex",
                marginTop: 2,
                backgroundColor: "#1976d2",
                width: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    padding: 1
                }}
            >
                <Typography sx={{ color: "#fff" }}>
                    BE IN TOUCH WITH US:
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        width: { sm: "30%", xs: "90%" },
                        minWidth: "300px",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <form
                        style={{
                            display: "flex",
                            gap: "8px",
                            minWidth: "300px",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                        <TextField
                            type='email'
                            placeholder='Enter your e-mail'
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 1,
                                width: "100%"
                            }}
                        />
                        <Button type="submit" variant="contained" sx={{ color: "#fff", backgroundColor: "#000" }}>Join Us</Button>
                    </form>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        padding: 1,
                        color: "#fff",
                        ".MuiSvgIcon-root": { fontSize: "1.6rem" },
                        ".MuiSvgIcon-root:hover": { color: "#000" }
                    }}
                >
                    <Instagram onClick={gotoUrl} />
                    <Facebook onClick={gotoUrl} />
                    <Twitter onClick={gotoUrl} />
                    <LinkedIn onClick={gotoUrl} />
                    <YouTube onClick={gotoUrl} />
                </Box>
            </Box>
        </Box>
    )
}

export default FouterContact