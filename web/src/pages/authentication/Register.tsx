import { Controller, useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import { AuthenticationResponse } from '../../types';

interface RegisterFormFields {
    firstName: string;
    lastName: string;
    // dateOfBirth: dayjs.Dayjs;
    email: string;
    password: string;
}

export function Register() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormFields>();

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    async function registerCustomer(formData: RegisterFormFields) {
        // Convert `Dayjs` to `Date` object before sending data to API
        const formattedData: { [key: string]: string } = {
            ...formData,
            username: formData.email
        };

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(formattedData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Registration failed!');
            }

        const data: AuthenticationResponse = await response.json();
            authCtx.login(data.token);
            navigate('/', { replace: true });
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                // Handle any other unexpected errors
                console.error(err);
            }
        }
    }

    return (
        <div className="centered-flex-wrapper">
            <div className="container">
                <img src="/logo_small.png" alt="Diary with Emotional Status" />
                <h2 style={{ color: '#051d38' }}>Register now</h2>
                <form
                    className="form-container"
                    onSubmit={handleSubmit(registerCustomer)}
                >
                    <TextField
                        {...register('firstName', {
                            required: 'First name is required',
                        })}
                        fullWidth
                        label="First name"
                        variant="standard"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        {...register('lastName', {
                            required: 'Last name is required',
                        })}
                        fullWidth
                        label="Last name"
                        variant="standard"
                        error={!!errors.lastName}
                    />
                    {/*<Controller*/}
                    {/*    name="dateOfBirth"*/}
                    {/*    control={control}*/}
                    {/*    rules={{ required: 'Date of birth is required' }}*/}
                    {/*    render={({ field }) => (*/}
                    {/*        <DatePicker*/}
                    {/*            {...field}*/}
                    {/*            sx={{ width: '300px' }}*/}
                    {/*            label="Date of birth"*/}
                    {/*            slotProps={{*/}
                    {/*                textField: {*/}
                    {/*                    variant: 'standard',*/}
                    {/*                    error: !!errors.dateOfBirth,*/}
                    {/*                    helperText: errors.dateOfBirth?.message,*/}
                    {/*                },*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                    <TextField
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
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
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be at least 6 characters',
                            },
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
                        Register
                    </Button>
                </form>
                <Typography>
                    Already have an account?{' '}
                    <NavLink to="/login" style={{ textDecoration: 'none' }}>
                        Login here
                    </NavLink>
                </Typography>
            </div>
        </div>
    );
}
