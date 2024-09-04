import NavBar from './components/navBar/navbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }}>
      <NavBar />
      <Outlet />
    </Box>
  );
}

export default App;
