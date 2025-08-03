import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import ShuffleIcon from '@mui/icons-material/Shuffle';

interface PortResultDisplayProps {
  ports: number[];
  onSave: (ports: number[]) => void;
  onRegenerate: () => void;
}

const PortResultDisplay: React.FC<PortResultDisplayProps> = ({
  ports,
  onSave,
  onRegenerate
}) => {
  const handleCopyToClipboard = () => {
    const portNumbers = ports.join(', ');
    navigator.clipboard.writeText(portNumbers).then(() => {
      // 可以添加成功提示
    }).catch(() => {
      // 可以添加错误提示
    });
  };

  const handleSave = () => {
    onSave(ports);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        生成结果
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          已生成 {ports.length} 个随机端口:
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 3,
          bgcolor: 'grey.50',
          borderRadius: 2
        }}>
          {ports.map((port, index) => (
            <Chip
              key={index}
              label={port}
              variant="filled"
              size="medium"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                height: '48px',
                minWidth: '80px',
                backgroundColor: 'primary.main',
                color: 'white',
                '& .MuiChip-label': {
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  px: 2
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyToClipboard}
          size="medium"
        >
          复制端口
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={onRegenerate}
          size="medium"
          color="secondary"
        >
          换一个
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="medium"
        >
          我用了
        </Button>
      </Box>
    </Box>
  );
};

export default PortResultDisplay; 