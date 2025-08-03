# 随机端口生成器

一个现代化的随机端口生成器Web应用，帮助开发者快速生成和管理端口号。

## 功能特性

### 🎯 核心功能
- **随机端口生成**: 在指定范围内生成随机端口号
- **批量生成**: 支持一次生成多个端口
- **端口管理**: 记录和管理已使用的端口
- **本地存储**: 使用IndexedDB进行数据持久化

### 🎨 用户界面
- **现代化设计**: 基于Material-UI的响应式界面
- **直观操作**: 简洁的用户交互流程
- **实时反馈**: 操作状态和结果即时显示

### 📊 数据管理
- **端口记录**: 详细记录每个端口的使用情况
- **搜索筛选**: 支持按端口号、备注、时间等条件筛选
- **数据导出**: 支持JSON格式的数据导出
- **数据导入**: 支持从JSON文件导入端口记录

## 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Material-UI (MUI)
- **状态管理**: React Hooks
- **数据存储**: IndexedDB
- **构建工具**: Create React App

## 项目结构

```
src/
├── components/          # React组件
│   ├── Navigation.tsx           # 导航组件
│   ├── PortRangeSlider.tsx      # 端口范围滑块
│   ├── PortCountSelector.tsx    # 端口数量选择器
│   ├── GenerateButton.tsx       # 生成按钮
│   ├── PortResultDisplay.tsx    # 端口结果显示
│   ├── UsedPortsList.tsx        # 已使用端口列表
│   ├── GeneratePortPage.tsx     # 生成端口页面
│   └── UsedPortsPage.tsx        # 已使用端口页面
├── services/           # 服务层
│   └── indexedDB.ts    # IndexedDB服务
├── utils/              # 工具函数
│   ├── portGenerator.ts # 端口生成器
│   └── localStorage.ts  # 本地存储工具
├── types/              # TypeScript类型定义
│   └── index.ts        # 类型定义
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口
```

## 安装和运行

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

## 使用说明

### 生成端口
1. 在"生成端口"页面设置端口范围
2. 选择要生成的端口数量
3. 点击"生成随机端口"按钮
4. 查看生成的端口结果
5. 点击"我用了"标记端口为已使用

### 管理已使用端口
1. 切换到"已使用端口"页面
2. 查看所有已使用的端口记录
3. 使用搜索和筛选功能查找特定端口
4. 编辑端口备注或删除不需要的记录
5. 导出数据或从文件导入

## 数据格式

### 端口记录格式
```json
{
  "id": "unique-id",
  "port": 8080,
  "actionId": "action-uuid",
  "usedAt": "2024-01-01T00:00:00.000Z",
  "note": "可选备注"
}
```

### 端口范围格式
```json
{
  "min": 1024,
  "max": 65535
}
```

## 开发指南

### 添加新功能
1. 在`types/index.ts`中定义相关类型
2. 在`utils/`目录下添加工具函数
3. 在`components/`目录下创建UI组件
4. 在相应页面中集成新功能

### 样式定制
项目使用Material-UI主题系统，可以在`App.tsx`中修改主题配置。

### 数据存储
所有数据存储在浏览器的IndexedDB中，无需服务器配置。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。
