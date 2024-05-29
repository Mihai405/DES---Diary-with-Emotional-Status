import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';

const pages = ['Home', 'Statistics', 'History'];

function NavBar() {
    const authCtx = React.useContext(AuthContext);
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleLogout() {
        authCtx.logout();
        handleCloseUserMenu();
        navigate('/login');
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#f1f8fb' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    <Box
                        component="img"
                        sx={{
                            mr: 1,
                            height: { xs: '40px', md: '50px' },
                        }}
                        alt="Logo of Diary with Emotional Status"
                        src="/logo_small.png"
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#051d38',
                            textShadow: '1px 1px 1px #b3d4f4',
                            textDecoration: 'none',
                        }}
                    >
                        Diary with Emotional Status |
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '3px',
                            flexGrow: 1,
                        }}
                    >
                        {pages.map(page => (
                            <Button key={page} sx={{ display: 'block' }}>
                                <NavLink
                                    to={`/${page.toLowerCase()}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#051d38',
                                        fontSize: '16px',
                                    }}
                                >
                                    {page}
                                </NavLink>
                            </Button>
                        ))}
                    </div>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: '#051d38',
                        textShadow: '1px 1px 1px #b3d4f4',
                        textDecoration: 'none',
                    }}
                >
                    DES
                </Typography>

                <Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Emma Watson" src="/user_avatar.png" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="logout" onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default NavBar;
