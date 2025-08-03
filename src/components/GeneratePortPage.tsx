import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PortRangeSlider from './PortRangeSlider';
import PortCountSelector from './PortCountSelector';
import GenerateButton from './GenerateButton';
import PortResultDisplay from './PortResultDisplay';
import { IndexedDBService } from '../services/IndexedDBService';
import { PortRecord } from '../types';

const GeneratePortPage: React.FC = () => {
  const [minPort, setMinPort] = useState(3000);
  const [maxPort, setMaxPort] = useState(65535);
  const [portCount, setPortCount] = useState(1);
  const [generatedPorts, setGeneratedPorts] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 从localStorage加载端口范围设置
  useEffect(() => {
    const savedMinPort = localStorage.getItem('minPort');
    const savedMaxPort = localStorage.getItem('maxPort');
    
    if (savedMinPort) setMinPort(parseInt(savedMinPort));
    if (savedMaxPort) setMaxPort(parseInt(savedMaxPort));
  }, []);

  // 保存端口范围设置到localStorage
  useEffect(() => {
    localStorage.setItem('minPort', minPort.toString());
    localStorage.setItem('maxPort', maxPort.toString());
  }, [minPort, maxPort]);

  const handleGeneratePorts = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const db = new IndexedDBService();
      await db.init();
      
      const usedPorts = await db.getPorts();
      const usedPortNumbers = usedPorts.map((record: PortRecord) => record.port);
      const availablePorts: number[] = [];
      
      // 生成可用端口
      for (let i = 0; i < portCount * 10 && availablePorts.length < portCount; i++) {
        const port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
        if (!usedPortNumbers.includes(port) && !availablePorts.includes(port)) {
          availablePorts.push(port);
        }
      }
      
      if (availablePorts.length < portCount) {
        setError(`在指定范围内只能找到 ${availablePorts.length} 个可用端口`);
      } else {
        const selectedPorts = availablePorts.slice(0, portCount);
        setGeneratedPorts(selectedPorts);
        setSuccess(`成功生成 ${portCount} 个随机端口`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成端口时发生错误');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePorts = async (ports: number[]) => {
    try {
      const db = new IndexedDBService();
      await db.init();
      
      const actionId = uuidv4();
      const portRecords: PortRecord[] = ports.map(port => ({
        id: uuidv4(),
        port,
        actionId,
        usedAt: new Date(),
        note: ''
      }));
      
      for (const record of portRecords) {
        await db.addPort(record);
      }
      
      setGeneratedPorts([]);
      setSuccess(`已保存 ${ports.length} 个端口到数据库`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存端口时发生错误');
    }
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
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          随机端口生成器
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          快速生成可用的随机端口号
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
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                mb: 3
              }}
            >
              配置设置
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                端口范围
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
                bgcolor: 'rgba(255,255,255,0.7)',
                borderRadius: 2
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  最小值: {minPort}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  最大值: {maxPort}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                可用端口数量: {availablePortCount.toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                生成数量
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
                当前设置: {portCount} 个端口
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* 右侧：操作和结果区域 */}
        <Box sx={{ flex: { xs: '1', md: '0 0 60%' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 生成操作区 */}
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  mb: 3
                }}
              >
                开始生成
              </Typography>
              <GenerateButton
                onGenerate={handleGeneratePorts}
                isGenerating={isGenerating}
              />
            </Paper>

            {/* 结果显示区 */}
            {generatedPorts.length > 0 && (
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                }}
              >
                <PortResultDisplay
                  ports={generatedPorts}
                  onSave={handleSavePorts}
                  onRegenerate={handleGeneratePorts}
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
    </Box>
  );
};

export default GeneratePortPage; 