import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './component/AppContext'

import { QueryClient, QueryClientProvider } from 'react-query'; // Importez QueryClient et QueryClientProvider
const queryClient = new QueryClient(); // Créez une instance de QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>      
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  // </React.StrictMode>,
)
