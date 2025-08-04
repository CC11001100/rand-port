import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import UsedPortsList from './UsedPortsList';
import { IndexedDBService } from '../services/IndexedDBService';
import { PortRecord } from '../types';

const UsedPortsPage: React.FC = () => {
  const { t } = useTranslation();
  const [ports, setPorts] = useState<PortRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadPorts = useCallback(async () => {
    try {
      setLoading(true);
      const db = new IndexedDBService();
      await db.init();
      const allPorts = await db.getPorts();
      setPorts(allPorts);
    } catch (err) {
      setError(t('usedPortsPage.loadError') as string);
      console.error('Load ports failed:', err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadPorts();
  }, [loadPorts]);

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
          {t('usedPortsPage.title')}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          {t('usedPortsPage.subtitle')}
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