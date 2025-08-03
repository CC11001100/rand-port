import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ListIcon from '@mui/icons-material/List';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          随机端口生成器
          <Typography component="span" variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
            v1.0
          </Typography>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<ShuffleIcon />}
            onClick={() => navigate('/generate')}
            sx={{
              backgroundColor: location.pathname === '/generate' ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            生成端口
          </Button>
          <Button
            color="inherit"
            startIcon={<ListIcon />}
            onClick={() => navigate('/used-ports')}
            sx={{
              backgroundColor: location.pathname === '/used-ports' ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            已使用端口
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 