import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ListIcon from '@mui/icons-material/List';
import { useTranslation } from 'react-i18next';
import GitHubIcon from './GitHubIcon';
import LanguageSwitch from './LanguageSwitch';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t('app.title')}
          <Typography component="span" variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
            {t('app.version')}
          </Typography>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            color="inherit"
            startIcon={<ShuffleIcon />}
            onClick={() => navigate('/generate')}
            sx={{
              backgroundColor: location.pathname === '/generate' ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            {t('navigation.generatePort')}
          </Button>
          <Button
            color="inherit"
            startIcon={<ListIcon />}
            onClick={() => navigate('/used-ports')}
            sx={{
              backgroundColor: location.pathname === '/used-ports' ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            {t('navigation.usedPorts')}
          </Button>
          <LanguageSwitch />
          <GitHubIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 