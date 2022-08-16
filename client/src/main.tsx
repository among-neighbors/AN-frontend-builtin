import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/organisms/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import FaceDetectPage from './pages/face/detect';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <FaceDetectPage />
        {/* <BrowserRouter>
        <SignPage />

          {/* <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/faceDetection' element={<FaceDetection />} />
          </Routes> }
        </BrowserRouter> */}

    </ThemeProvider>
 
  </React.StrictMode>,
);