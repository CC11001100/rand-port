import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip
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
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          textAlign: 'center',
          mb: 3
        }}
      >
        生成结果
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: 'center', mb: 3 }}
        >
          已生成 {ports.length} 个随机端口
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 4,
          bgcolor: 'rgba(255,255,255,0.8)',
          borderRadius: 3,
          border: '2px solid rgba(255,255,255,0.5)',
          justifyContent: 'center'
        }}>
          {ports.map((port, index) => (
            <Chip
              key={index}
              label={port}
              variant="filled"
              size="medium"
              sx={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                height: '56px',
                minWidth: '100px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)',
                '& .MuiChip-label': {
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  px: 3
                },
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)',
                  transition: 'all 0.3s ease-in-out'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: 3
      }}>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyToClipboard}
          size="large"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.main',
              color: 'white',
              transform: 'translateY(-1px)',
            }
          }}
        >
          复制端口
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={onRegenerate}
          size="large"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
              backgroundColor: 'secondary.main',
              color: 'white',
              transform: 'translateY(-1px)',
            }
          }}
        >
          换一个
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
            boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)',
              boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
              transform: 'translateY(-1px)',
            }
          }}
        >
          我用了
        </Button>
      </Box>
    </Box>
  );
};

export default PortResultDisplay; 