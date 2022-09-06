import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { connect } from 'react-redux';
import { RootState } from './others/store';
import Checker from './components/organisms/Checker';
import CommunityViewPageElder from './pages/CommunityViewPageElder';
import ComplaintViewPageElder from './pages/ComplaintViewPageElder';
import NoticeViewPageElder from './pages/NoticeViewPageElder';
import FaceDetection from './pages/FaceDetectionPage';
import HomePageElder from './pages/HomePageElder';
import ViewPage from './pages/ViewPage';
import ListPage from './pages/ListPage';

interface RouterProps {
  state: RootState;
}

const Router = ({ state }: RouterProps) => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme(false)}>
          <Checker />
        </ThemeProvider>
        <ThemeProvider theme={theme(state.helpSideBarReducer)}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/faceDetection' element={<FaceDetection />} />
            {/* Default */}
            <Route path='/sign' element={<SignPage />} />
            <Route path='/notice' element={<ListPage type='notice' mode='dafualt' />} />
            <Route path='/notice'>
              <Route path=':id' element={<ViewPage type='notice' mode='dafualt' />} />
            </Route>
            <Route path='/complaint' element={<ListPage type='complaint' mode='dafualt' />} />
            <Route path='/complaint'>
              <Route path=':id' element={<ViewPage type='complaint' mode='dafualt' />} />
            </Route>
            <Route path='/community' element={<ListPage type='community' mode='dafualt' />} />
            <Route path='/community'>
              <Route path=':id' element={<ViewPage type='community' mode='dafualt' />} />
            </Route>
            {/* Elder */}
            <Route path='/elder' element={<HomePageElder />} />
            <Route path='/noticeElder' element={<ListPage type='notice' mode='elder' />} />
            <Route path='/noticeElder'>
              <Route path=':id' element={<ViewPage type='notice' mode='elder' />} />
            </Route>
            <Route path='/complaintElder' element={<ListPage type='complaint' mode='elder' />} />
            <Route path='/complaintElder'>
              <Route path=':id' element={<ViewPage type='notice' mode='elder' />} />
            </Route>
            <Route path='/communityElder' element={<ListPage type='community' mode='elder' />} />
            <Route path='/communityElder'>
              <Route path=':id' element={<ViewPage type='notice' mode='elder' />} />
            </Route>
            <Route path='/*'> </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps)(Router);
