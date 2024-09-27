import { Mail, Password, Person } from "@mui/icons-material"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../utils/store"
import { singUpStatus } from "../slice/statusSlice"

interface UserInformation {
    name?: string
    mail?: string
    pass?: string
}

function SignUp() {
    const signUpRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(state => state.status)
    const [user, setUser] = useState<UserInformation>({
        name: "",
        mail: "",
        pass: "",
    })

    const handleSignUp = () => {
        if (isOpen) {
            dispatch(singUpStatus())
            localStorage.setItem("user", JSON.stringify(user))
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", (e: MouseEvent) => {
                if (signUpRef.current && !signUpRef.current.contains(e.target as Node)) {
                    dispatch(singUpStatus())
                }
            })
        }
    }, [isOpen, dispatch])
    return (
        <Box sx={{
            position: "fixed",
            width: "100%", height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)"

        }}>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "#fff",
                    padding: 5,
                    borderRadius: 4,
                    width: "50%",
                    boxShadow: "6px 4px 20px 1px rgba(0,0,0,0.3)"
                }}
                ref={signUpRef}
            >
                <Typography component="p" sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold"
                }}>Sign Up</Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <Person sx={{ fontSize: "2rem", color: "rgba(0,0,0,0.8)" }} />
                    <TextField label="name" variant="outlined" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <Mail sx={{ fontSize: "2rem", color: "rgba(0,0,0,0.8)" }} />
                    <TextField label="mail" variant="outlined" value={user.mail} onChange={e => setUser({ ...user, mail: e.target.value })} />
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <Password sx={{ fontSize: "2rem", color: "rgba(0,0,0,0.8)" }} />
                    <TextField label="password" variant="outlined" type="password" value={user.pass} onChange={e => setUser({ ...user, pass: e.target.value })} />
                </Box>
                <Button
                    sx={{
                        width: "50%",
                        backgroundColor: "#3e58ff",
                        color: "#fff",
                        padding: 2,
                        "&: hover": {
                            backgroundColor: "#3547bf"
                        }
                    }}
                    onClick={handleSignUp}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default SignUp