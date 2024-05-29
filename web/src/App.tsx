import './App.css';
import React, { useContext } from 'react';
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
import { HistoryPage } from './pages/HistoryPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AuthContext, AuthContextProvider } from './store/auth-context';

function App() {
    return (
        <React.StrictMode>
            <AuthContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AppSWRConfig>
                        <RouterProvider router={router} />
                    </AppSWRConfig>
                </LocalizationProvider>
            </AuthContextProvider>
        </React.StrictMode>
    );
}

function AppSWRConfig({ children }: { children: React.ReactNode }) {
    const authCtx = useContext(AuthContext);

    return (
        <SWRConfig
            value={{
                fetcher: async url => {
                    const res = await fetch(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authCtx.token}`,
                        },
                    });
                    return res.json();
                },
            }}
        >
            {children}
        </SWRConfig>
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
                element={
                    <LayoutWrapper>
                        <HistoryPage />
                    </LayoutWrapper>
                }
            />
            <Route
                path="/Statistics"
                element={
                    <LayoutWrapper>
                        <StatisticsPage />
                    </LayoutWrapper>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>
    )
);

export default App;
