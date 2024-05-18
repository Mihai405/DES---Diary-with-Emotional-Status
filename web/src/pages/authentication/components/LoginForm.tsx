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
                onSubmit={handleSubmit(registerCustomer)}
            >
                <TextField
                    {...register('email')}
                    fullWidth
                    type="email"
                    required
                    placeholder="Email"
                    error={!!errors.email}
                />
                <TextField
                    {...register('password')}
                    fullWidth
                    type="password"
                    placeholder="Password"
                    error={!!errors.password}
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

function registerCustomer(form: LoginFormFields) {
    console.log(form);
    //TODO: Send the form data to the backend
}
