import NavBar from './components/navBar/navbar'; 
import { Outlet } from 'react-router-dom';
import styles from "./App.module.scss";

function App() {

  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
