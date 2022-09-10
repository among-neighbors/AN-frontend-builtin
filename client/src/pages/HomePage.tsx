import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
import { accessTokenState, handleHelpSideBar, RootState } from '~/others/store';
import { connect } from 'react-redux';

interface HomeProps {
  accessToken: accessTokenState;
}
const HomePage = ({ accessToken }: HomeProps) => {
  return (
    <>
      <Header />
      <Home accessToken={accessToken} />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(HomePage);
