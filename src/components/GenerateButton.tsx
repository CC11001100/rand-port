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
        startIcon={<ShuffleIcon />}
        sx={{
          py: 2,
          px: 4,
          fontSize: '1.1rem',
          fontWeight: 600,
          minWidth: 200
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" component="span">
            生成随机端口
          </Typography>
          <Typography variant="caption" component="span" sx={{ opacity: 0.8 }}>
            点击开始生成
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default GenerateButton; 