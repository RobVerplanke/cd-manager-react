import { Profiler } from 'react';
import { onRender } from './utils/helperFunctions';
import { DataProvider } from './context/DataContext';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MainHeader from './components/MainHeader';

import './index.css';

function App() {
  return (
    // Set global styling for the app
    <div className="font-sans text-[#333333] flex h-screen bg-gray-400">
      <div className="bg-gray-700 h-full w-40 pt-28">
        <NavigationBar />
      </div>
      <div className="flex flex-col flex-grow">
        <DataProvider>
          <MainHeader />
          <Profiler id="Outlet" onRender={onRender}>
            <div className="bg-gray-300 h-full ">
              <Outlet />
            </div>
          </Profiler>
        </DataProvider>
      </div>
    </div>
  );
}

export default App;
