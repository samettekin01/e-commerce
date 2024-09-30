import NavBar from './components/navBar/navbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { totalCalculate } from './components/slice/shopSlice';
import { useAppDispatch, useAppSelector } from './components/utils/store';
import SignUp from './components/SignUp/SignUp';
import Slider from './components/slider/slider';

function App() {

  const { isOpen } = useAppSelector(state => state.status)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    dispatch(totalCalculate())
  }, [dispatch, isOpen])

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    }}>
      <NavBar />
      <Slider />
      <Outlet />
      {isOpen && <SignUp />}
    </Box>
  );
}

export default App;
