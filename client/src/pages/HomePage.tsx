import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
import { accessTokenState, handleHelpSideBar, RootState, ProfileState } from '~/others/store';
import { connect } from 'react-redux';

interface HomeProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}
const HomePage = ({ accessToken, profileData }: HomeProps) => {
  return (
    <>
      <Header />

      <Home accessToken={accessToken} profileData={profileData} />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(HomePage);
