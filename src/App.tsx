import NavBar from './components/navBar/navbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { totalCalculate } from './components/slice/shopSlice';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(totalCalculate())
  }, [dispatch])

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
