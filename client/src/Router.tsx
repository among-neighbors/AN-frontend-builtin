import { ThemeProvider } from '@mui/material';
// import theme from './others/myTheme';
import Header from './components/organisms/Header';
import theme from './others/colorTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
// import ListPage from './pages/ListPage';
import { connect } from 'react-redux';
import { RootState } from './others/store';
// import ViewPage from './pages/ViewPage';
// import WrittingPage from './pages/WrittingPage';
import { Navigate } from 'react-router-dom';
import Checker from './components/organisms/Checker';
import CommunityViewPageElder from './pages/CommunityViewPageElder';
import CommunityPageElder from './pages/CommunityPageElder';
import ComplaintViewPageElder from './pages/ComplaintViewPageElder';
import ComplaintPageElder from './pages/ComplaintPageElder';
import NoticeViewPageElder from './pages/NoticeViewPageElder';
import NoticePageElder from './pages/NoticePageElder';
import CommunityViewPage from './pages/CommunityViewPage';
import CommunityPage from './pages/CommunityPage';
import ComplaintViewPage from './pages/ComplaintViewPage';
import ComplaintPage from './pages/ComplaintPage';
import NoticeViewPage from './pages/NoticeViewPage';
import NoticePage from './pages/NoticePage';
import FaceDetection from './pages/FaceDetectionPage';
import HomePageElder from './pages/HomePageElder';

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
