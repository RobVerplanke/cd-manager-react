import { Profiler, useEffect } from 'react';
import { onRender } from './utils/helperFunctions';
import { useData } from './context/DataContext';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import MainHeader from './components/MainHeader';
import { ErrorPage, ConfirmedPage } from './components/pages';
import './index.css';

function App() {
  const { error, confirmationMessage } = useData();

  return (
    // Set global styling for the app
    <div className="font-sans text-[#333333] flex h-screen bg-gray-400">
      <div className="bg-gray-700 h-full w-40 pt-28">
        <NavigationBar />
      </div>
      <div className="flex flex-col flex-grow">
        <MainHeader />
        <Profiler id="Outlet" onRender={onRender}>
          <div className="bg-gray-300 h-full ">
            {error ? (
              <ErrorPage error={error} />
            ) : confirmationMessage ? (
              <ConfirmedPage action={confirmationMessage} />
            ) : (
              <Outlet />
            )}
          </div>
        </Profiler>
      </div>
    </div>
  );
}

export default App;
