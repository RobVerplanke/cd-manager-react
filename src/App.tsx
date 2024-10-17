import { Profiler } from 'react';
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
    <div className="h-screen font-sans text-[#333333] flex bg-[#176061] relative">
      <div className="bg-[#176061] w-40 pt-36">
        <NavigationBar />
      </div>
      <div className="flex flex-col flex-grow">
        <MainHeader />
        <Profiler id="Outlet" onRender={onRender}>
          <div className="bg-[#F5F5F5] h-full overflow-scroll rounded-tl-xl">
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
