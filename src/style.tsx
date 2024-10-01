export const style = {
    menu: {
        "& .link": {
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            gap: 1,
            color: "#000",
            fontSize: "0.9rem",
            borderRadius: 1,
        },
        "&:hover": { backgroundColor: "#000" },
        "&:hover .link": { color: "#fff" }
    },
    utils: {
        display: "flex",
        alignItems: "center",
        margin: 1
    },
    icon: {
        fontSize: "1.6rem",
        color: "#000"
    },
    hover: {
        borderRadius: 2,
        "&: hover": {
            backgroundColor: "#000",
            color: "#fff",
        }
    },
    res: {
        padding: 0,
        margin: 0
    }
}

export const popupStyle = {
    display: "flex",
    textDecoration: "none",
    justifyContent: "space-between",
    gap: 1,
    color: "#000",
    fontSize: "1rem",
    borderRadius: 1,
    padding: 2,
    "&:hover": { backgroundColor: "#000", color: "#fff" }
}
