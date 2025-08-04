import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import PortRangeSlider from './PortRangeSlider';
import PortCountSelector from './PortCountSelector';
import GenerateButton from './GenerateButton';
import PortResultDisplay from './PortResultDisplay';
import { PortRecord, PortRange } from '../types';
import { PortGenerator } from '../utils/portGenerator';

const GeneratePortPage: React.FC = () => {
  const { t } = useTranslation();
  const [minPort, setMinPort] = useState(3000);
  const [maxPort, setMaxPort] = useState(65536);
  const [portCount, setPortCount] = useState(1);
  const [generatedPorts, setGeneratedPorts] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 从localStorage加载端口范围和生成数量设置
  useEffect(() => {
    const savedMinPort = localStorage.getItem('minPort');
    const savedMaxPort = localStorage.getItem('maxPort');
    const savedPortCount = localStorage.getItem('portCount');

    if (savedMinPort) setMinPort(parseInt(savedMinPort));
    if (savedMaxPort) setMaxPort(parseInt(savedMaxPort));
    if (savedPortCount) setPortCount(parseInt(savedPortCount));

    // 标记初始化完成
    setIsInitialized(true);
  }, []);

  // 保存端口范围设置到localStorage（只在初始化完成后）
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('minPort', minPort.toString());
      localStorage.setItem('maxPort', maxPort.toString());
    }
  }, [minPort, maxPort, isInitialized]);

  // 保存生成数量设置到localStorage（只在初始化完成后）
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('portCount', portCount.toString());
    }
  }, [portCount, isInitialized]);

  const handleGeneratePorts = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccess(null);

    try {
      // 使用更高效的PortGenerator算法
      const range: PortRange = { min: minPort, max: maxPort };
      const portRecords = await PortGenerator.generateRandomPorts(range, portCount);

      // 提取端口号
      const selectedPorts = portRecords.map(record => record.port);
      setGeneratedPorts(selectedPorts);
      setSuccess(t('generatePage.generateSuccess', { count: portCount }));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('generatePage.generateError'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePorts = async (ports: number[]) => {
    try {
      const actionId = uuidv4();
      const portRecords: PortRecord[] = ports.map(port => ({
        id: uuidv4(),
        port,
        actionId,
        usedAt: new Date(),
        note: ''
      }));

      // 使用PortGenerator的方法保存端口
      await PortGenerator.markPortsAsUsed(portRecords);

      setGeneratedPorts([]);
      setSuccess(t('generatePage.saveSuccess', { count: ports.length }));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('generatePage.saveError'));
    }
  };

  const handleCopySuccess = (message: string) => {
    setCopyMessage(message);
  };

  const availablePortCount = maxPort - minPort + 1;

  return (
    <Box>
      {/* 页面标题 */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 2
          }}
        >
          {t('generatePage.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          {t('generatePage.subtitle')}
        </Typography>
      </Box>

      {/* 主要内容区域 */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        {/* 左侧：配置区域 */}
        <Box sx={{ flex: { xs: '1', md: '0 0 40%' } }}>
          <Paper
            elevation={1}
            sx={{
              p: 4,
              backgroundColor: '#ffffff',
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                mb: 3
              }}
            >
              {t('generatePage.configSettings')}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {t('generatePage.portRange')}
              </Typography>
              <PortRangeSlider
                minPort={minPort}
                maxPort={maxPort}
                onMinPortChange={setMinPort}
                onMaxPortChange={setMaxPort}
              />
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                p: 2,
                bgcolor: '#fafafa',
                borderRadius: 1,
                border: '1px solid #e0e0e0'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {t('generatePage.minValue')}: {minPort}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {t('generatePage.maxValue')}: {maxPort}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {t('generatePage.availablePorts', { count: availablePortCount.toLocaleString() })}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {t('generatePage.portCount')}
              </Typography>
              <PortCountSelector
                portCount={portCount}
                onPortCountChange={setPortCount}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {t('generatePage.currentSetting', { count: portCount })}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* 右侧：操作和结果区域 */}
        <Box sx={{ flex: { xs: '1', md: '0 0 60%' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 生成操作区 */}
            <Paper
              elevation={1}
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: '#fafafa',
                border: '2px solid #212121'
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  mb: 3
                }}
              >
                {t('generatePage.startGenerate')}
              </Typography>
              <GenerateButton
                onGenerate={handleGeneratePorts}
                isGenerating={isGenerating}
              />
            </Paper>

            {/* 结果显示区 */}
            {generatedPorts.length > 0 && (
              <Paper
                elevation={1}
                sx={{
                  p: 4,
                  backgroundColor: '#ffffff'
                }}
              >
                <PortResultDisplay
                  ports={generatedPorts}
                  onSave={handleSavePorts}
                  onRegenerate={handleGeneratePorts}
                  onCopySuccess={handleCopySuccess}
                />
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      {/* 错误提示 */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      {/* 成功提示 */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      {/* 复制成功提示 */}
      <Snackbar
        open={!!copyMessage}
        autoHideDuration={3000}
        onClose={() => setCopyMessage(null)}
      >
        <Alert severity="info" onClose={() => setCopyMessage(null)}>
          {copyMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GeneratePortPage; 