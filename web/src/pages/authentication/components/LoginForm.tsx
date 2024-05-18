import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';

interface LoginFormFields {
    email: string;
    password: string;
}

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormFields>();

    return (
        <div className="container">
            <img src="/logo_small.png" alt="Diary with Emotional Status" />
            <h2>Sign in to your account</h2>
            <form
                className="form-container"
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
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </form>
            <Typography>
                Don't have an account?{' '}
                <a style={{ textDecoration: 'none' }} href="/register">
                    Register here
                </a>
            </Typography>
        </div>
    );
}

function handleLogin(formData: LoginFormFields) {
    console.log(formData);
    //TODO: Send the form data to the backend
}
