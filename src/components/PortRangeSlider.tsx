import React from 'react';
import {
  Box,
  Slider,
  Button,
  ButtonGroup
} from '@mui/material';

interface PortRangeSliderProps {
  minPort: number;
  maxPort: number;
  onMinPortChange: (value: number) => void;
  onMaxPortChange: (value: number) => void;
}

const PortRangeSlider: React.FC<PortRangeSliderProps> = ({
  minPort,
  maxPort,
  onMinPortChange,
  onMaxPortChange
}) => {
  const presetRanges = [
    { label: '1', min: 1, max: 1024 },
    { label: '1024', min: 1024, max: 3000 },
    { label: '3000', min: 3000, max: 65535 },
    { label: '65535', min: 1, max: 65535 }
  ];

  const handlePresetClick = (min: number, max: number) => {
    onMinPortChange(min);
    onMaxPortChange(max);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <ButtonGroup size="small" variant="outlined">
          {presetRanges.map((range, index) => (
            <Button
              key={index}
              onClick={() => handlePresetClick(range.min, range.max)}
              sx={{
                backgroundColor: minPort === range.min && maxPort === range.max 
                  ? 'primary.main' 
                  : 'transparent',
                color: minPort === range.min && maxPort === range.max 
                  ? 'white' 
                  : 'inherit',
                '&:hover': {
                  backgroundColor: minPort === range.min && maxPort === range.max 
                    ? 'primary.dark' 
                    : 'action.hover',
                }
              }}
            >
              {range.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Box sx={{ px: 2 }}>
        <Slider
          value={[minPort, maxPort]}
          onChange={(_, newValue) => {
            const [min, max] = newValue as number[];
            onMinPortChange(min);
            onMaxPortChange(max);
          }}
          min={1}
          max={65535}
          step={1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </Box>
  );
};

export default PortRangeSlider; 