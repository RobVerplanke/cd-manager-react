import { Profiler } from 'react';
import { onRender } from './utils/helperFunctions';
import { DataProvider } from './context/DataContext';
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
          <DataProvider>
            <MainHeader />
            <Profiler id="Outlet" onRender={onRender}>
              <Outlet />
            </Profiler>
          </DataProvider>
        </div>
      </div>
    </>
  );
}

export default App;
