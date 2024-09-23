import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MainHeader from './components/MainHeader';
import './styles/App.css';

function App() {
  return (
    <>
      <div className="app-container">
        <NavigationBar />
        <div className="app-container__main-container">
          <MainHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
