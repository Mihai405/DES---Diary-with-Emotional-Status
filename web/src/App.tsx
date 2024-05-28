import './App.css';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Login } from './pages/authentication/Login';
import { Register } from './pages/authentication/Register';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
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
                element={<Navigate replace to="/home" />}
                errorElement={<ErrorPage />}
            />
            <Route
                path="/home"
                element={
                    <LayoutWrapper>
                        <HomePage />
                    </LayoutWrapper>
                }
            />
            <Route
                path="/history"
                element={<LayoutWrapper>History</LayoutWrapper>}
            />
            <Route
                path="/Statistics"
                element={<LayoutWrapper>Statistics</LayoutWrapper>}
            />
            <Route
                path="/profile"
                element={<LayoutWrapper>Profile</LayoutWrapper>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    )
);

export default App;
