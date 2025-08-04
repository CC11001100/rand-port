import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Delete,
  Download,
  Upload
} from '@mui/icons-material';
import { IndexedDBService } from '../services/IndexedDBService';
import { PortRecord, PortFilter, PortSort } from '../types';

interface UsedPortsListProps {
  ports: PortRecord[];
  onPortsChange: () => void;
}

const UsedPortsList: React.FC<UsedPortsListProps> = ({ ports, onPortsChange }) => {
  const [filter, setFilter] = useState<PortFilter>({});
  const [sort, setSort] = useState<PortSort>({ field: 'usedAt', direction: 'desc' });
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // 筛选和排序端口
  const filteredAndSortedPorts = useMemo(() => {
    let filtered = ports.filter(port => {
      if (filter.portRange) {
        if (port.port < filter.portRange.min || port.port > filter.portRange.max) {
          return false;
        }
      }
      if (filter.keyword) {
        const keyword = filter.keyword.toLowerCase();
        if (!port.port.toString().includes(keyword) &&
            !(port.actionId && port.actionId.toLowerCase().includes(keyword))) {
          return false;
        }
      }
      if (filter.dateRange) {
        const portDate = new Date(port.usedAt);
        if (portDate < filter.dateRange.start || portDate > filter.dateRange.end) {
          return false;
        }
      }
      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any = a[sort.field];
      let bValue: any = b[sort.field];
      
      if (sort.field === 'usedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sort.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [ports, filter, sort]);

  const handleDeletePort = async (id: string) => {
    try {
      const db = new IndexedDBService();
      await db.init();
      await db.removePort(id);
      onPortsChange();
      setSuccess('端口删除成功');
    } catch (error) {
      setError('删除端口失败');
      console.error('删除端口失败:', error);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredAndSortedPorts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `used-ports-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setSuccess('导出成功');
  };

  const handleImport = async () => {
    try {
      const data = JSON.parse(importData);
      if (!Array.isArray(data)) {
        throw new Error('导入数据格式错误');
      }

      const db = new IndexedDBService();
      await db.init();
      
      for (const record of data) {
        if (record.id && record.port && record.actionId && record.usedAt) {
          await db.addPort({
            ...record,
            usedAt: new Date(record.usedAt)
          });
        }
      }
      
      setImportDialogOpen(false);
      setImportData('');
      onPortsChange();
      setSuccess(`成功导入 ${data.length} 个端口记录`);
    } catch (error) {
      setError('导入失败：数据格式错误');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('确定要清空所有端口记录吗？此操作不可恢复。')) {
      try {
        const db = new IndexedDBService();
        await db.init();
        await db.clearAll();
        onPortsChange();
        setSuccess('所有端口记录已清空');
      } catch (error) {
        setError('清空数据库失败');
        console.error('清空数据库失败:', error);
      }
    }
  };

  if (ports.length === 0) {
    return (
      <Card>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            暂无已使用的端口
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            生成的端口将显示在这里
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      {/* 筛选和排序控制 */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            筛选和排序
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              label="关键字搜索"
              value={filter.keyword || ''}
              onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>排序字段</InputLabel>
              <Select
                value={sort.field}
                onChange={(e) => setSort({ ...sort, field: e.target.value as 'port' | 'usedAt' })}
              >
                <MenuItem value="port">端口号</MenuItem>
                <MenuItem value="usedAt">使用时间</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>排序方向</InputLabel>
              <Select
                value={sort.direction}
                onChange={(e) => setSort({ ...sort, direction: e.target.value as 'asc' | 'desc' })}
              >
                <MenuItem value="asc">升序</MenuItem>
                <MenuItem value="desc">降序</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Card>

      {/* 操作按钮 */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            已使用端口列表 ({filteredAndSortedPorts.length}个)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Upload />}
              onClick={() => setImportDialogOpen(true)}
              size="small"
            >
              导入
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
              size="small"
            >
              导出
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearAll}
              size="small"
              color="error"
            >
              清空
            </Button>
          </Box>
        </Box>
      </Card>

      {/* 端口列表 */}
      <Card>
        <List>
          {filteredAndSortedPorts.map((port, index) => (
            <React.Fragment key={port.id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeletePort(port.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 'bold',
                          color: 'primary.main',
                          fontSize: '1.4rem'
                        }}
                      >
                        端口 {port.port}
                      </Typography>
                      <Chip
                        label={port.actionId ? port.actionId.slice(0, 8) : 'N/A'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.secondary" component="span" display="block">
                        使用时间: {new Date(port.usedAt).toLocaleString()}
                      </Typography>
                      {port.note && (
                        <Typography variant="body2" color="text.secondary" component="span" display="block">
                          备注: {port.note}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < filteredAndSortedPorts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* 导入对话框 */}
      <Dialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>导入端口数据</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={10}
            label="JSON数据"
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialogOpen(false)}>取消</Button>
          <Button onClick={handleImport} variant="contained">导入</Button>
        </DialogActions>
      </Dialog>

      {/* 消息提示 */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess('')}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsedPortsList; 