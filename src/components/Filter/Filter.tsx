import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
function Filter({ handleFilter, filterVal }: { handleFilter: (e: SelectChangeEvent<number>) => void, filterVal: number }) {

    return (
        <Box sx={{
            margin: 1,
            marginRight: 2,
            marginLeft: "auto",
            backgroundColor: "#fff",
            padding: 3
        }}>
            <FormControl variant="standard" sx={{ maxWidth: 200, marginLeft: "auto" }}>
                <InputLabel id="select-label">Filter</InputLabel>
                <Select
                    labelId="select-label"
                    label="Filter"
                    value={filterVal}
                    onChange={handleFilter}
                >
                    <MenuItem value={1}>Recommend</MenuItem>
                    <MenuItem value={2}>Price: Low to High</MenuItem>
                    <MenuItem value={3}>Price: High to Low</MenuItem>
                    <MenuItem value={4}>Price: A to Z</MenuItem>
                    <MenuItem value={5}>Price: Z to A</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Filter