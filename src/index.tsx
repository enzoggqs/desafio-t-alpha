import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import themeVariables from "./config/Theme";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes';
import { ToastContainer } from 'react-toastify';

const theme = extendTheme(themeVariables);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <RoutesComponent />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

