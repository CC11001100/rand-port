import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import UsedPortsList from './UsedPortsList';
import { IndexedDBService } from '../services/IndexedDBService';
import { PortRecord } from '../types';

const UsedPortsPage: React.FC = () => {
  const [ports, setPorts] = useState<PortRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadPorts = async () => {
    try {
      setLoading(true);
      const db = new IndexedDBService();
      await db.init();
      const allPorts = await db.getPorts();
      setPorts(allPorts);
    } catch (err) {
      setError('加载端口数据失败');
      console.error('加载端口失败:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPorts();
  }, []);

  const handlePortsChange = () => {
    loadPorts();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          已使用端口管理
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary">
          查看和管理您已使用的端口记录
        </Typography>
      </Box>

      <UsedPortsList
        ports={ports}
        onPortsChange={handlePortsChange}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsedPortsPage; 