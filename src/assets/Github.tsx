import { GitHub } from '@mui/icons-material'
import { Box } from '@mui/material'

function Github() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                zIndex: 50,
                top: 80,
                right: 0,
                backgroundColor: "black",
                padding: "2px",
                paddingRight: "20px",
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px"
            }}
        >
            <a
                href='https://github.com/samettekin01'
                target='_blank'
                rel='noreferrer'
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <GitHub
                    sx={{
                        color: "white",
                        fontSize: "40px",
                        cursor: "pointer",
                        transition: "color .3s",
                        "&:hover": {
                            color: "gray"
                        }
                    }}
                />

            </a>
        </Box>
    )
}

export default Github