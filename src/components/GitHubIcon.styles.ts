import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

// 样式化的GitHub图标按钮
export const StyledGitHubButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
  '& svg': {
    width: 24,
    height: 24,
  },
}));

// GitHub SVG 图标的样式
export const gitHubIconStyles = {
  width: 24,
  height: 24,
  fill: 'currentColor',
  transition: 'all 0.2s ease-in-out',
};
