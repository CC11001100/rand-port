import React from 'react';
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  isGenerating
}) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="contained"
        size="large"
        onClick={onGenerate}
        disabled={isGenerating}
        startIcon={<ShuffleIcon sx={{ fontSize: '2rem' }} />}
        sx={{
          py: 3,
          px: 6,
          fontSize: '1.3rem',
          fontWeight: 700,
          minWidth: 280,
          minHeight: 80,
          borderRadius: 6,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          boxShadow: '0 8px 32px rgba(254, 107, 139, 0.3)',
          color: 'white',
          border: '2px solid rgba(255,255,255,0.3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
            boxShadow: '0 12px 40px rgba(254, 107, 139, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
          '&:disabled': {
            background: 'rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.7)',
            boxShadow: 'none',
          },
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
            {isGenerating ? '生成中...' : '生成随机端口'}
          </Typography>
          <Typography variant="body2" component="span" sx={{ opacity: 0.9, mt: 0.5 }}>
            {isGenerating ? '请稍候' : '点击开始生成'}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default GenerateButton; 