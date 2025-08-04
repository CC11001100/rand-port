import React from 'react';
import {
  Box,
  Slider,
  Button,
  ButtonGroup
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const presetRanges = [
    { labelKey: 'generatePage.presetRanges.system', min: 1, max: 1024 },
    { labelKey: 'generatePage.presetRanges.registered', min: 1024, max: 49151 },
    { labelKey: 'generatePage.presetRanges.dynamic', min: 49152, max: 65535 },
    { labelKey: 'generatePage.presetRanges.all', min: 1, max: 65535 }
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
              {t(range.labelKey)}
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
          max={65536}
          step={1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </Box>
  );
};

export default PortRangeSlider; 