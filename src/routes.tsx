import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import {
  ErrorPage,
  BrowseItemsPage,
  ItemDetails,
  LibraryPage,
  SearchItemPage,
  TagSelectionPage,
  ItemFormPage,
} from './components/pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage error={''} />,
    children: [
      {
        index: true, // Set this page as default "Homepage"
        element: <BrowseItemsPage />,
      },
      {
        path: 'details/:id',
        element: <ItemDetails />,
      },
      {
        path: 'edit/:id',
        element: <ItemFormPage isEditMode={true} />,
      },
      {
        path: 'add',
        element: <ItemFormPage isEditMode={false} />,
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
