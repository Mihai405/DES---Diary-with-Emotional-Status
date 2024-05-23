import './App.css';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Login } from './pages/authentication/Login';
import { Register } from './pages/authentication/Register';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { SWRConfig } from 'swr';
import { LayoutWrapper } from './components/LayoutWrapper';

function App() {
    return (
        <React.StrictMode>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SWRConfig
                    value={{
                        fetcher: (resource, init) =>
                            fetch(resource, init).then(res => res.json()),
                    }}
                >
                    <RouterProvider router={router} />
                </SWRConfig>
            </LocalizationProvider>
        </React.StrictMode>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={
                    <LayoutWrapper>
                        <HomePage />
                    </LayoutWrapper>
                }
                errorElement={<ErrorPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    )
);

export default App;
