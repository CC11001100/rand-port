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

interface PortResultDisplayProps {
  ports: number[];
  onSave: (ports: number[]) => void;
}

const PortResultDisplay: React.FC<PortResultDisplayProps> = ({
  ports,
  onSave
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
          gap: 1, 
          p: 2, 
          bgcolor: 'grey.50', 
          borderRadius: 1 
        }}>
          {ports.map((port, index) => (
            <Chip
              key={index}
              label={port}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyToClipboard}
          size="small"
        >
          复制端口
        </Button>
        
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="small"
        >
          保存到数据库
        </Button>
      </Box>
    </Box>
  );
};

export default PortResultDisplay; 