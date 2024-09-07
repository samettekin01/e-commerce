import NavBar from './components/navBar/navbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { totalCalculate } from './components/slice/shopSlice';
import { useAppDispatch } from './components/utils/store';

function App() {

  const dispatch = useAppDispatch()

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
