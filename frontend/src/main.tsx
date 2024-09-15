import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { AppContextProvider } from './contexts/AppContext.tsx'

import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
