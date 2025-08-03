import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Alert,
  Snackbar
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
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          随机端口生成器
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          快速生成可用的随机端口号
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {/* 配置设置 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              配置设置
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                端口范围设置
              </Typography>
              <PortRangeSlider
                minPort={minPort}
                maxPort={maxPort}
                onMinPortChange={setMinPort}
                onMaxPortChange={setMaxPort}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">
                  最小值: {minPort}
                </Typography>
                <Typography variant="body2">
                  最大值: {maxPort}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                可用端口数量: {availablePortCount.toLocaleString()}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                生成端口数量
              </Typography>
              <PortCountSelector
                portCount={portCount}
                onPortCountChange={setPortCount}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                当前设置: {portCount} 个端口
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 生成端口 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              生成端口
            </Typography>
            <GenerateButton
              onGenerate={handleGeneratePorts}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>

        {/* 结果显示 */}
        {generatedPorts.length > 0 && (
          <PortResultDisplay
            ports={generatedPorts}
            onSave={handleSavePorts}
          />
        )}
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