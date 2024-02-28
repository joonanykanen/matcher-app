// src/components/TopBar.js, JN, 27.02.2024
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const pages = [
    { name: 'Home', route: '/' },
    { name: 'Swipe', route: '/swipe' },
    { name: 'Chat', route: '/chat' },
  ];

const settings = [
    { name: 'Profile', route: '/profile/view' },
    { name: 'Account', route: '/profile/edit' },
    { name: 'Logout', route: '/login' }, // Assuming logout redirects to login for simplicity
  ];

function TopBar() {
  const { user, updateUser } = useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (route) => {
    navigate(route);
    handleCloseNavMenu();
  };

  const handleSettingClick = (route) => {
    if (route === '/login') {
      // Remove the auth_token from localStorage or wherever it is stored
      localStorage.removeItem('auth_token');
    }

    navigate(route);
    handleCloseUserMenu();
    // Implement Logout functionality if needed here
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <LocalFireDepartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  MATCHER
                </Typography>
                <LocalFireDepartmentIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  MATCHER
                </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
              {!user && (
                <Box  >
                  <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                  <Button color="inherit" onClick={handleRegisterClick}>Register</Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalFireDepartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MATCHER
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handlePageClick(page.route)}>
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
                ))}

              </Menu>
            </Box>
            <LocalFireDepartmentIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MATCHER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handlePageClick(page.route)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
              <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Tooltip title="Open settings">
                  <Avatar alt={user ? user.firstName : "User"} src={user && user.profilePic ? `/${user.profilePic}` : "/uploads/defaultPic.png"} />
                </Tooltip>
              </IconButton>
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
                {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleSettingClick(setting.route)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default TopBar;

// eof
