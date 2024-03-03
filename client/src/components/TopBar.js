// src/components/TopBar.js, JN, 27.02.2024
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import { useTranslation } from 'react-i18next';

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
import LanguageIcon from '@mui/icons-material/Language';

function TopBar() {
  const { user, updateUser } = useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const pages = [
    { name: t('pages.home'), route: '/' },
    { name: t('pages.swipe'), route: '/swipe' },
    { name: t('pages.chat'), route: '/chat' },
  ];
  
  const settings = [
    { name: t('settings.profile'), route: '/profile/view' },
    { name: t('settings.account'), route: '/profile/edit' },
    { name: t('settings.logout'), route: '/' }, // Assuming logout redirects to index for simplicity
  ];

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
    if (route === '/') {
      // Remove the auth_token from localStorage or wherever it is stored
      localStorage.removeItem('auth_token');

      // We use href instead of navigate to clear the user context
      window.location.href = '/';
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

  // Function to toggle the language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fi' : 'en';
    i18n.changeLanguage(newLang);
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
                  <Button color="inherit" onClick={handleLoginClick}>{t("login")}</Button>
                  <Button color="inherit" onClick={handleRegisterClick}>{t("register")}</Button>
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
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 2 }}>
              {/* Language toggle button */}
              <Tooltip title={t("changeLanguage")} sx={{ mr: 2 }}>
                <IconButton onClick={toggleLanguage} color="inherit">
                  <LanguageIcon />
                </IconButton>
              </Tooltip>
              
              {/* Profile avatar and menu */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Tooltip title={t("openSettings")}>
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
