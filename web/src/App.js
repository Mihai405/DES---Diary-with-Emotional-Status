import './App.css';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoginForm } from './pages/authentication/components/LoginForm';
import { RegisterForm } from './pages/authentication/components/RegisterForm';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                {/*<LoginForm />*/}
                <RegisterForm />
            </div>
        </LocalizationProvider>
    );
}

export default App;
