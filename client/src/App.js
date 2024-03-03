import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppContext } from './context';

// src/components
import Index from './components/Index';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditProfile from './components/Profile/EditProfile';
import ViewProfile from './components/Profile/ViewProfile';
import SwipeView from './components/Swipe/SwipeView';
import ChatListView from './components/Chat/ChatListView';
import ChatWindow from './components/Chat/ChatWindow';
import NotFound from './components/NotFound';
import TopBar from './components/TopBar';

// MUI & styles
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import './styles.css';

// i18n lang
import './i18n';

function App() {
  const { darkMode } = useContext(AppContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <TopBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/view" element={<ViewProfile />} />
                <Route path="/swipe" element={<SwipeView />} />
                <Route path="/chat" element={<ChatListView />} />
                <Route path="/chat/:matchId" element={<ChatWindow />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
