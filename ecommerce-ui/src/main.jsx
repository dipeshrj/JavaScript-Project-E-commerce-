import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import guestRoutes from './components/routes/GuestRoutes.jsx';
import './index.css';
import loginRoutes from './components/routes/LoginRoutes.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


const router = createBrowserRouter([...loginRoutes,...guestRoutes]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
