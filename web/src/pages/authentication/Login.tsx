import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';

interface LoginFormFields {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormFields>();

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogin(formData: LoginFormFields) {
        console.log(formData);
        //TODO: Send the form data to the backend

        // try {
        //     const response = await fetch('/users/login', {
        //         method: 'PATCH',
        //         body: JSON.stringify({
        //             email: formData.email,
        //             password: formData.password,
        //         }),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Login failed!');
        //     }
        //
        //     const data: LoginResponse = await response.json();
        //     authCtx.login(data.token);
        //     navigate('/', { replace: true });
        // } catch (err) {
        //     if (err instanceof Error) {
        //         alert(err.message);
        //     } else {
        //         // Handle any other unexpected errors
        //         console.error(err);
        //     }
        // }
    }

    return (
        <div className="centered-flex-wrapper">
            <div className="container">
                <img src="/logo_small.png" alt="Diary with Emotional Status" />
                <h2 style={{ color: '#051d38' }}>Sign in to your account</h2>
                <form
                    className="form-container"
                    autoComplete="off"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <TextField
                        {...register('email', {
                            required: 'Email is required',
                        })}
                        fullWidth
                        type="email"
                        label="Email"
                        variant="standard"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        fullWidth
                        type="password"
                        label="Password"
                        variant="standard"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: '#051d38' }}
                    >
                        Login
                    </Button>
                </form>
                <Typography>
                    Don't have an account?{' '}
                    <NavLink to="/register" style={{ textDecoration: 'none' }}>
                        Register here
                    </NavLink>
                </Typography>
            </div>
        </div>
    );
}
