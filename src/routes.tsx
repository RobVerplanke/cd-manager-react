import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import {
  ErrorPage,
  BrowseItemsPage,
  ItemDetails,
  EditItemPage,
  AddItemPage,
  LibraryPage,
  SearchItemPage,
  TagSelectionPage,
} from './components/pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Set this page as default "Homepage"
        element: <BrowseItemsPage />,
      },
      {
        path: '/details/:id',
        element: <ItemDetails />,
      },
      {
        path: '/edit/:id',
        element: <EditItemPage />,
      },
      {
        path: 'add',
        element: <AddItemPage />,
      },
      {
        path: 'library/:itemCategory',
        element: <LibraryPage />,
      },
      {
        path: 'search',
        element: <SearchItemPage />,
      },
      {
        path: 'tag-selection/:tag',
        element: <TagSelectionPage />,
      },
    ],
  },
]);

export default router;
