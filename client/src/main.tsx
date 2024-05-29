import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const custom = {
  styles: {
    global: {
      'html, body': {
        background: '#61d2be',
      },
    },
  },
}

const theme = extendTheme(custom);

const queryClient = new QueryClient();

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>,
);
