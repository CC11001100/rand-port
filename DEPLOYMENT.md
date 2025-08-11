# GitHub Pages 部署说明

## 解决 GitHub Pages 路由刷新问题

本项目已经配置了专门解决 GitHub Pages 上单页应用（SPA）路由刷新 404 问题的完整方案。

### 问题描述

在 GitHub Pages 上部署 React 应用时，如果用户直接访问某个路由（如 `/generate`）或刷新页面，会得到 404 错误。这是因为 GitHub Pages 是静态文件服务器，不知道如何处理客户端路由。

### 解决方案

#### 1. 使用 HashRouter

将 `BrowserRouter` 改为 `HashRouter`，这样路由会使用 URL 的 hash 部分（#），避免服务器端路由问题。

```tsx
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
```

**优点：**
- 完全兼容 GitHub Pages
- 不需要服务器配置
- 路由刷新不会出现 404 错误

**缺点：**
- URL 会包含 `#` 符号（如 `/#/generate`）
- 对 SEO 不太友好

#### 2. 创建 404.html 重定向文件

在 `public/` 目录下创建 `404.html` 文件，GitHub Pages 会自动使用这个文件来处理 404 错误。

#### 3. 在 index.html 中添加路由处理脚本

在 `public/index.html` 中添加 JavaScript 代码来处理路由重定向。

### 部署步骤

1. 确保 `package.json` 中的 `homepage` 字段设置正确：
   ```json
   {
     "homepage": "http://www.cc11001100.com/rand-port"
   }
   ```

2. 构建项目：
   ```bash
   npm run build
   ```

3. 将 `build/` 目录的内容推送到 GitHub 仓库的 `gh-pages` 分支，或者使用 GitHub Actions 自动部署

4. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源

### GitHub Pages 配置

1. 进入 GitHub 仓库设置
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 `gh-pages` 分支
5. 保存设置

### 验证部署

部署完成后，测试以下场景：

1. 直接访问根路径：`http://www.cc11001100.com/rand-port/`
2. 直接访问子路由：`http://www.cc11001100.com/rand-port/#/generate`
3. 在子路由页面刷新浏览器
4. 使用浏览器的前进/后退按钮

所有场景都应该正常工作，不会出现 404 错误。

### 注意事项

- 使用 HashRouter 后，URL 会包含 `#` 符号（如 `/#/generate`）
- 这是 GitHub Pages 上最可靠的解决方案
- 确保所有静态资源路径都使用相对路径或正确的 PUBLIC_URL
- GitHub Pages 不支持 `.htaccess` 文件，所以不需要创建

### 替代方案

如果您希望保持干净的 URL（不带 # 符号），可以考虑：

1. **使用其他静态托管服务**：如 Netlify、Vercel 等，它们对 SPA 路由有更好的支持
2. **使用 GitHub Actions 部署到自己的服务器**：这样可以完全控制服务器配置
3. **接受 HashRouter 的限制**：这是 GitHub Pages 上最简单可靠的解决方案 