import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import Navigation from './components/Navigation';
import GeneratePortPage from './components/GeneratePortPage';
import UsedPortsPage from './components/UsedPortsPage';

// 创建简洁的主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// 根路径重定向组件
const RootRedirect: React.FC = () => {
  useEffect(() => {
    // 如果当前在根路径且没有basename，重定向到带basename的路径
    const basename = process.env.PUBLIC_URL || '';
    if (basename && window.location.pathname === '/') {
      window.location.href = basename;
    }
  }, []);

  return null;
};

function App() {
  // 获取基础路径，支持GitHub Pages部署
  const basename = process.env.PUBLIC_URL || '';

  // 如果在根路径且有basename，显示重定向组件
  if (basename && window.location.pathname === '/') {
    return <RootRedirect />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navigation />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/generate" replace />} />
              <Route path="/generate" element={<GeneratePortPage />} />
              <Route path="/used-ports" element={<UsedPortsPage />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
