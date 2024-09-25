import { Profiler } from 'react';
import { onRender } from './utils/helperFunctions';
import { DataProvider } from './context/DataContext';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MainHeader from './components/MainHeader';

import './index.css';

function App() {
  return (
    <div className="flex font-sans bg-gray-400 h-screen">
      <div className=" bg-gray-700 h-screen">
        <NavigationBar />
      </div>
      <div>
        <DataProvider>
          <MainHeader />
          <Profiler id="Outlet" onRender={onRender}>
            <Outlet />
          </Profiler>
        </DataProvider>
      </div>
    </div>
  );
}

export default App;
