import React from 'react';
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useTranslation } from 'react-i18next';

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  isGenerating
}) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="contained"
        size="large"
        onClick={onGenerate}
        disabled={isGenerating}
        startIcon={<ShuffleIcon sx={{ fontSize: '2rem' }} />}
        sx={{
          py: 1.5,
          px: 3,
          fontSize: '1rem',
          fontWeight: 500,
          minWidth: 160,
          minHeight: 44,
          borderRadius: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
          '&:disabled': {
            backgroundColor: 'action.disabled',
            color: 'text.disabled',
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
            {isGenerating ? t('generatePage.generating') : t('generatePage.generateRandomPort')}
          </Typography>
          <Typography variant="body2" component="span" sx={{ opacity: 0.9, mt: 0.5 }}>
            {isGenerating ? t('generatePage.pleaseWait') : t('generatePage.clickToStart')}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default GenerateButton; 