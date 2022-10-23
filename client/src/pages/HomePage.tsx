import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
import { accessTokenState, RootState, ProfileState } from '~/others/store';
import { connect } from 'react-redux';

interface HomeProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}
const HomePage = ({ accessToken, profileData }: HomeProps) => {
  return (
    <>
      <Header accessToken={accessToken} profileData={profileData} />
      <Home />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
    profileData: state.profileReducer,
    isHelpCallSideBarOpen: state.helpSideBarReducer,
  };
};

export default connect(mapStateToProps)(HomePage);
