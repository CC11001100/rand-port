# Random Port Generator

[🇨🇳 中文版](./README-zh.md) | 🇺🇸 English

A modern, user-friendly web application for generating random available port numbers. Built with React, TypeScript, and Material-UI, featuring internationalization support for English and Simplified Chinese.

## 🌟 Features

### Core Functionality
- **Random Port Generation**: Generate 1-1000 random ports in customizable ranges
- **Smart Port Range Selection**: Choose from preset ranges (System, Registered, Dynamic, All)
- **Port Availability Check**: Automatically excludes commonly used ports
- **Batch Generation**: Generate multiple ports at once with intelligent deduplication

### Port Management
- **Used Ports Tracking**: Automatically save and track used ports
- **Search & Filter**: Search ports by number, sort by port or time
- **Import/Export**: Backup and restore port data in JSON format
- **Local Storage**: All data stored locally in IndexedDB

### User Experience
- **Internationalization**: Full i18n support for English and Simplified Chinese
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark/Light Theme**: Clean, modern Material-UI design
- **One-Click Copy**: Copy generated ports to clipboard instantly
- **Real-time Updates**: Live port count and availability display

## 🚀 Live Demo

**🌐 [Try it now on GitHub Pages](https://cc11001100.github.io/rand-port/)**

## 📸 Screenshots

### English Interface
![Generate Ports - English](./images/generate-result-en.png)
*Generate random ports with customizable settings*

![Used Ports Management - English](./images/used-ports-en.png)
*Manage and track your used ports*

### Chinese Interface (中文界面)
![Generate Ports - Chinese](./images/generate-result-zh.png)
*生成随机端口 - 中文界面*

![Used Ports Management - Chinese](./images/used-ports-zh.png)
*已使用端口管理 - 中文界面*

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Data Storage**: IndexedDB (via custom service)
- **Build Tool**: Create React App
- **Testing**: Playwright (E2E testing)

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/CC11001100/rand-port.git
cd rand-port

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Build for Production
```bash
# Create production build
npm run build

# Serve locally (optional)
npm install -g serve
serve -s build
```

## 🎯 Usage Guide

### Generating Ports

1. **Set Port Range**: Use preset buttons or custom slider
   - **System Ports**: 1-1024 (reserved for system services)
   - **Registered Ports**: 1024-49151 (registered applications)
   - **Dynamic Ports**: 49152-65535 (temporary/private use)
   - **All Ports**: 1-65535 (full range)

2. **Choose Quantity**: Select 1-1000 ports to generate

3. **Generate**: Click the generate button to create random ports

4. **Use Results**: Copy ports or mark them as used

### Managing Used Ports

- **View History**: See all previously used ports with timestamps
- **Search**: Find specific ports quickly
- **Sort**: Order by port number or usage time
- **Export/Import**: Backup your data as JSON
- **Delete**: Remove individual ports or clear all data

### Language Switching

Click the language icon (🌐) in the navigation bar to switch between:
- 🇺🇸 **English**
- 🇨🇳 **简体中文** (Simplified Chinese)

Your language preference is automatically saved and restored.

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
├── services/           # Data services (IndexedDB)
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Translation files
│       ├── en.json     # English translations
│       └── zh.json     # Chinese translations
└── App.tsx             # Main application
```

### Available Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from CRA (irreversible)
```

### Adding New Languages

1. Create translation file in `src/i18n/locales/[lang].json`
2. Add language to `src/i18n/index.ts` resources
3. Update `LanguageSwitch.tsx` component
4. Add language option to the dropdown

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Maintain i18n support for all new features
- Add appropriate tests for new functionality
- Follow Material-UI design patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Material-UI](https://mui.com/) - Component library
- [react-i18next](https://react.i18next.com/) - Internationalization
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**Made with ❤️ by [CC11001100](https://github.com/CC11001100)**

*Need a specific port range or have suggestions? [Open an issue](https://github.com/CC11001100/rand-port/issues)!*
