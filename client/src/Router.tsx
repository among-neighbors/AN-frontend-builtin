import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { connect } from 'react-redux';
import { RootState } from './others/store';
import Checker from './components/organisms/Checker';
import CommunityViewPageElder from './pages/CommunityViewPageElder';
import CommunityPageElder from './pages/CommunityPageElder';
import ComplaintViewPageElder from './pages/ComplaintViewPageElder';
import ComplaintPageElder from './pages/ComplaintPageElder';
import NoticeViewPageElder from './pages/NoticeViewPageElder';
import NoticePageElder from './pages/NoticePageElder';
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
        <ThemeProvider theme={theme(false)}>{/* <Checker /> */}</ThemeProvider>
        <ThemeProvider theme={theme(state.helpSideBarReducer)}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/faceDetection' element={<FaceDetection />} />
            {/* Default */}
            <Route path='/sign' element={<SignPage />} />
            <Route path='/notice' element={<ListPage type='notice' />} />
            <Route path='/notice'>
              <Route path=':id' element={<ViewPage type='notice' />} />
            </Route>
            <Route path='/complaint' element={<ListPage type='complaint' />} />
            <Route path='/complaint'>
              <Route path=':id' element={<ViewPage type='complaint' />} />
            </Route>
            <Route path='/community' element={<ListPage type='community' />} />
            <Route path='/community'>
              <Route path=':id' element={<ViewPage type='community' />} />
            </Route>
            {/* Elder */}
            <Route path='/elder' element={<HomePageElder />} />
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
