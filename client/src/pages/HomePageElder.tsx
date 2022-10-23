import { connect } from 'react-redux';
import { accessTokenState, ProfileState } from '~/others/store';
import HeaderElder from '~/components/organisms/HeaderElder';
import HomeElder from '~/components/organisms/HomeLayoutElder';
// import MyMap from '~/components/organisms/MyMap';

interface HomeProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

const HomePageElder = ({ accessToken, profileData }: HomeProps) => {
  return (
    <>
      <HeaderElder accessToken={accessToken} profileData={profileData} />
      <HomeElder />
      {/* <MyMap /> */}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(HomePageElder);
