import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { store } from './others/store';
import NoticePage from './pages/NoticePage';
import ComplaintPage from './pages/ComplaintPage';
import CommunityPage from './pages/CommunityPage';
import NoticeViewPage from './pages/NoticeViewPage';
import FaceDetection from './pages/FaceDetectionPage';
import ComplaintViewPage from './pages/ComplaintViewPage';
import CommunityViewPage from './pages/CommunityViewPage';
import HomePageElder from './pages/HomePageElder';
import NoticePageElder from './pages/NoticePageElder';
import ComplaintPageElder from './pages/ComplaintPageElder';
import NoticeViewPageElder from './pages/NoticeViewPageElder';
import ComplaintViewPageElder from './pages/ComplaintViewPageElder';
import CommunityPageElder from './pages/CommunityPageElder';
import CommunityViewPageElder from './pages/CommunityViewPageElder';
import Checker from './components/organisms/Checker';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Checker />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/elder' element={<HomePageElder />} />
            <Route path='/faceDetection' element={<FaceDetection />} />
            <Route path='/sign' element={<SignPage />} />
            {/* Default */}
            <Route path='/notice' element={<NoticePage />} />
            <Route path='/notice'>
              <Route path=':id' element={<NoticeViewPage />} />
            </Route>
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/complaint'>
              <Route path=':id' element={<ComplaintViewPage />} />
            </Route>
            <Route path='/community' element={<CommunityPage />} />
            <Route path='/community'>
              <Route path=':id' element={<CommunityViewPage />} />
            </Route>
            {/* Elder */}
            <Route path='/noticeElder' element={<NoticePageElder />} />
            <Route path='/noticeElder'>
              <Route path=':id' element={<NoticeViewPageElder />} />
            </Route>
            <Route path='/complaintElder' element={<ComplaintPageElder />} />
            <Route path='/complaintElder'>
              <Route path=':id' element={<ComplaintViewPageElder />} />
            </Route>
            <Route path='/communityElder' element={<CommunityPageElder />} />
            <Route path='/communityElder'>
              <Route path=':id' element={<CommunityViewPageElder />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
    {/* <style jsx global='true'>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      html,
      body,
      #root,
      #root > div {
        width: 100%;
      }
      #root {
        display: flex;
      }
    `}</style> */}
  </>,
);
