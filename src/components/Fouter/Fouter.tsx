import { Box } from "@mui/material"
import FouterSupport from "./FouterSupport"
import FouterContact from "./FouterContact"
import FouterCopyright from "./FouterCopyright"
import FouterAbout from "./FouterAbout"


function Fouter() {
    return (
        <Box>
            <FouterSupport />
            <FouterContact />
            <FouterAbout />
            <FouterCopyright />
        </Box>
    )
}

export default Fouter