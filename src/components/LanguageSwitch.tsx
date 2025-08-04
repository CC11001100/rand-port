import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const languages = [
    { code: 'en', name: t('language.en'), flag: '🇺🇸' },
    { code: 'zh', name: t('language.zh'), flag: '🇨🇳' }
  ];

  // const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      <Tooltip title={t('language.switch')}>
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
          }
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === i18n.language}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <span style={{ fontSize: '1.2rem' }}>{language.flag}</span>
            </ListItemIcon>
            <ListItemText primary={language.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitch;
