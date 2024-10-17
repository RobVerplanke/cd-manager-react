import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { DataProvider } from './context/DataContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
