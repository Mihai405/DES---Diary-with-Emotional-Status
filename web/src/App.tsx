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

function App() {
    return (
        <React.StrictMode>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
            </LocalizationProvider>
        </React.StrictMode>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<div>Homepage</div>}
                errorElement={<ErrorPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    )
);

export default App;
