import React, { useState, useEffect } from 'react';
import {
  Box,
  Slider,
  Button,
  ButtonGroup,
  TextField,
  Typography
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
  const [minInputValue, setMinInputValue] = useState(minPort.toString());
  const [maxInputValue, setMaxInputValue] = useState(maxPort.toString());
  const [minError, setMinError] = useState('');
  const [maxError, setMaxError] = useState('');
  
  // 动态计算拖动条的范围
  const [sliderMin, setSliderMin] = useState(1);
  const [sliderMax, setSliderMax] = useState(65535);

  // 同步外部props变化到内部状态
  useEffect(() => {
    setMinInputValue(minPort.toString());
    setMaxInputValue(maxPort.toString());
    
    // 动态调整拖动条范围，确保包含当前的最小值和最大值
    const newSliderMin = Math.min(1, minPort);
    const newSliderMax = Math.max(65535, maxPort);
    setSliderMin(newSliderMin);
    setSliderMax(newSliderMax);
  }, [minPort, maxPort]);

  const presetRanges = [
    { labelKey: 'generatePage.presetRanges.system', min: 1, max: 1024 },
    { labelKey: 'generatePage.presetRanges.registered', min: 1024, max: 49151 },
    { labelKey: 'generatePage.presetRanges.dynamic', min: 49152, max: 65535 },
    { labelKey: 'generatePage.presetRanges.all', min: 1, max: 65535 }
  ];

  const handlePresetClick = (min: number, max: number) => {
    onMinPortChange(min);
    onMaxPortChange(max);
    setMinInputValue(min.toString());
    setMaxInputValue(max.toString());
    setMinError('');
    setMaxError('');
  };

  const validatePortRange = (min: number, max: number): { minError: string; maxError: string } => {
    let minError = '';
    let maxError = '';

    if (min < 1 || min > 65535) {
      minError = t('generatePage.portRangeError.invalidMin') as string;
    }
    if (max < 1 || max > 65535) {
      maxError = t('generatePage.portRangeError.invalidMax') as string;
    }
    if (min >= max && !minError && !maxError) {
      minError = t('generatePage.portRangeError.minGreaterThanMax') as string;
    }

    return { minError, maxError };
  };

  const handleMinInputChange = (value: string) => {
    setMinInputValue(value);
    const numValue = parseInt(value);

    if (!isNaN(numValue)) {
      const { minError, maxError } = validatePortRange(numValue, maxPort);
      setMinError(minError);
      setMaxError(maxError);

      if (!minError && !maxError) {
        onMinPortChange(numValue);
        
        // 动态调整拖动条范围
        const newSliderMin = Math.min(sliderMin, numValue);
        setSliderMin(newSliderMin);
      }
    } else if (value === '') {
      setMinError('');
    } else {
      setMinError(t('generatePage.portRangeError.invalidNumber') as string);
    }
  };

  const handleMaxInputChange = (value: string) => {
    setMaxInputValue(value);
    const numValue = parseInt(value);

    if (!isNaN(numValue)) {
      const { minError, maxError } = validatePortRange(minPort, numValue);
      setMinError(minError);
      setMaxError(maxError);

      if (!minError && !maxError) {
        onMaxPortChange(numValue);
        
        // 动态调整拖动条范围
        const newSliderMax = Math.max(sliderMax, numValue);
        setSliderMax(newSliderMax);
      }
    } else if (value === '') {
      setMaxError('');
    } else {
      setMaxError(t('generatePage.portRangeError.invalidNumber') as string);
    }
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
            setMinInputValue(min.toString());
            setMaxInputValue(max.toString());
            setMinError('');
            setMaxError('');
          }}
          min={sliderMin}
          max={sliderMax}
          step={1}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>

      {/* 手动输入框 */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {t('generatePage.minValue')}
          </Typography>
          <TextField
            size="small"
            type="number"
            value={minInputValue}
            onChange={(e) => handleMinInputChange(e.target.value)}
            error={!!minError}
            helperText={minError}
            inputProps={{
              min: 1,
              max: 65535,
              step: 1
            }}
            fullWidth
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {t('generatePage.maxValue')}
          </Typography>
          <TextField
            size="small"
            type="number"
            value={maxInputValue}
            onChange={(e) => handleMaxInputChange(e.target.value)}
            error={!!maxError}
            helperText={maxError}
            inputProps={{
              min: 1,
              max: 65535,
              step: 1
            }}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PortRangeSlider; 