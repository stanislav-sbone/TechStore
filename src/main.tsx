import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@/index.css';
import App from '@/App.tsx';
import { Provider } from 'react-redux';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { store } from '@/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
