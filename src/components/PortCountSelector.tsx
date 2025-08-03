import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  ButtonGroup
} from '@mui/material';

interface PortCountSelectorProps {
  portCount: number;
  onPortCountChange: (value: number) => void;
}

const PortCountSelector: React.FC<PortCountSelectorProps> = ({
  portCount,
  onPortCountChange
}) => {
  const presetCounts = [1, 5, 10, 20, 50];

  const handlePresetClick = (count: number) => {
    onPortCountChange(count);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 1000) {
      onPortCountChange(value);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <ButtonGroup size="small" variant="outlined">
          {presetCounts.map((count) => (
            <Button
              key={count}
              onClick={() => handlePresetClick(count)}
              sx={{
                backgroundColor: portCount === count ? 'primary.main' : 'transparent',
                color: portCount === count ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: portCount === count ? 'primary.dark' : 'action.hover',
                }
              }}
            >
              {count}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Box>
        <TextField
          label="端口数量"
          type="number"
          value={portCount}
          onChange={handleInputChange}
          inputProps={{
            min: 1,
            max: 1000,
            step: 1
          }}
          size="small"
          fullWidth
          helperText="请输入1-1000之间的数字"
        />
      </Box>
    </Box>
  );
};

export default PortCountSelector; 