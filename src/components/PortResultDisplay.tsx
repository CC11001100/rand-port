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
  onCopySuccess?: (message: string) => void;
}

const PortResultDisplay: React.FC<PortResultDisplayProps> = ({
  ports,
  onSave,
  onRegenerate,
  onCopySuccess
}) => {
  const handleCopyToClipboard = () => {
    const portNumbers = ports.join(', ');
    navigator.clipboard.writeText(portNumbers).then(() => {
      onCopySuccess?.('端口号已复制到剪切板');
    }).catch(() => {
      onCopySuccess?.('复制失败，请手动复制');
    });
  };

  const handleSave = () => {
    // 先复制端口到剪切板
    const portNumbers = ports.join(', ');
    navigator.clipboard.writeText(portNumbers).then(() => {
      onCopySuccess?.('端口已保存并复制到剪切板');
    }).catch(() => {
      onCopySuccess?.('端口已保存，但复制到剪切板失败');
    });

    // 然后保存端口
    onSave(ports);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 500,
          color: 'text.primary',
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
          p: 3,
          bgcolor: '#f8f9fa',
          borderRadius: 1,
          border: '1px solid #e0e0e0',
          justifyContent: 'center'
        }}>
          {ports.map((port, index) => (
            <Chip
              key={index}
              label={port}
              variant="filled"
              size="medium"
              sx={{
                fontSize: '1.2rem',
                fontWeight: '500',
                height: '48px',
                minWidth: '90px',
                backgroundColor: '#f5f5f5',
                color: 'text.primary',
                border: '1px solid #e0e0e0',
                '& .MuiChip-label': {
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  px: 2
                },
                '&:hover': {
                  backgroundColor: '#eeeeee',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
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
          size="medium"
          sx={{
            px: 3,
            py: 1,
            fontWeight: 500,
            borderColor: '#bdbdbd',
            color: 'text.primary',
            '&:hover': {
              borderColor: '#9e9e9e',
              backgroundColor: '#f5f5f5',
            }
          }}
        >
          复制端口
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={onRegenerate}
          size="medium"
          sx={{
            px: 3,
            py: 1,
            fontWeight: 500,
            borderColor: '#bdbdbd',
            color: 'text.primary',
            '&:hover': {
              borderColor: '#9e9e9e',
              backgroundColor: '#f5f5f5',
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
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 500,
            backgroundColor: '#e0e0e0',
            color: 'text.primary',
            '&:hover': {
              backgroundColor: '#d5d5d5',
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