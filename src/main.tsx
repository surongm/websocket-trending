import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary, ErrorFallback } from '@/pages'
import { ConfigProvider } from 'antd'
import zhCN from "antd/locale/zh_CN";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} >
      <ErrorBoundary fallback={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </ConfigProvider>

  </StrictMode>,
)
