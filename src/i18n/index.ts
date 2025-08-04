import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言资源
import en from './locales/en.json';
import zh from './locales/zh.json';

// 语言资源配置
const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

// 自定义语言检测器配置
const detectionOptions = {
  // 检测顺序：localStorage -> navigator -> htmlTag -> path -> subdomain
  order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  
  // 缓存用户选择的语言
  caches: ['localStorage'],
  
  // localStorage的key名称
  lookupLocalStorage: 'i18nextLng',
  
  // 从navigator.language检测
  checkWhitelist: true,
  
  // 如果检测失败，使用的默认语言
  fallbackLng: 'en'
};

i18n
  // 使用语言检测器
  .use(LanguageDetector)
  // 传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    resources,
    
    // 默认语言
    fallbackLng: 'en',
    
    // 调试模式（生产环境应设为false）
    debug: process.env.NODE_ENV === 'development',
    
    // 语言检测配置
    detection: detectionOptions,
    
    // 插值配置
    interpolation: {
      escapeValue: false, // React已经默认转义了
    },
    
    // 支持的语言列表
    supportedLngs: ['en', 'zh'],
    
    // 非显式支持的语言回退到fallbackLng
    nonExplicitSupportedLngs: true,
    
    // 命名空间
    defaultNS: 'translation',
    
    // 加载配置
    load: 'languageOnly', // 只加载语言代码，不加载地区代码
    
    // 清理代码
    cleanCode: true,
  });

export default i18n;
