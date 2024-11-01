import NavBar from './components/navBar/navbar';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { totalCalculate } from './components/slice/shopSlice';
import { useAppDispatch, useAppSelector } from './components/utils/store';
import SignUp from './components/SignUp/SignUp';
import Slider from './components/slider/slider';
import Fouter from './components/Fouter/Fouter';
import Github from './assets/Github';

function App() {

  const { isOpen } = useAppSelector(state => state.status)
  const { id } = useParams()
  const location = useLocation()
  const pathReg = /(basket|favorites)/g

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    dispatch(totalCalculate())
  }, [dispatch, isOpen, location])

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    }}>
      <NavBar />
      {!id && !location.pathname.match(pathReg) && <Slider />}
      <Outlet />
      {isOpen && <SignUp />}
      <Fouter />
      <Github />
    </Box>
  );
}

export default App;
