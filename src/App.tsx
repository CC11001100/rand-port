import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import Navigation from './components/Navigation';
import GeneratePortPage from './components/GeneratePortPage';
import UsedPortsPage from './components/UsedPortsPage';
import './i18n'; // 导入i18n配置

// 创建简洁的黑白主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#212121', // 墨黑色，现代简洁
    },
    secondary: {
      main: '#424242', // 深灰色，用于次要元素
    },
    background: {
      default: '#ffffff', // 纯白色背景
    },
    text: {
      primary: '#212121', // 墨黑色文字，高对比度
      secondary: '#616161', // 中等灰色文字
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
          borderRadius: 2, // 非常小的圆角，更高雅
          boxShadow: 'none', // 去除阴影
          '&:hover': {
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)', // 更轻微的悬停阴影
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4, // 更小的圆角，更朴素
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)', // 更轻的阴影
          border: '1px solid #e0e0e0', // 添加边框
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
