import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  getReadyForRequestAPI,
  handleRefreshAccountAccessToken,
  // handleRefreshProfileAccessToken,
  RootState,
} from '~/others/store';
// import ProfileHome from './ProfileHome';
import { useNavigate, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  const { accountAccessToken, isFaceDetectionOK } = accessTokenState;
  const [accountKey, setAccountKey] = useState(false);
  // const [isFaceDetection, setIsFaceDetection] = useState(false);
  // const [profileKey, setProfileKey] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAccountLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/account-token', null, true);
      handleRefreshAccountAccessToken(res.data.response.accessToken);
      // console.log(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setAccountKey(true);
    }
  };

  // const checkProfileLogin = async () => {
  //   try {
  //     const res = await myAxios('post', 'api/v1/auth/profile-token', null, true);
  //     handleRefreshProfileAccessToken(res.data.response.accessToken);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setProfileKey(true);
  //   }
  // };

  useEffect(() => {
    checkAccountLogin();
    // checkProfileLogin();
  }, []);

  useEffect(() => {
    if (!accountKey) {
      return;
    }
    getReadyForRequestAPI;

    if (accountAccessToken !== '') {
      console.log('....');
      navigate('/');
    }

    if (accountAccessToken === '') {
      const isAllowPath = allowPath.some((path) => location.pathname === path);
      navigate('/sign');
    }
  }, [accountKey, location.pathname]);

  useInterval(checkAccountLogin, accountAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);
  // useInterval(checkProfileLogin, profileAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);

  if (accountKey && accountAccessToken !== '') {
    // navigate('/faceDetection');
    // return <ProfileHome token={accountAccessToken} />;
  }
  return <></>;
};

const allowPath = ['/', '/sign', '/faceDetection'];

const TIME_FOR_REFRESH_TOKEN = 10000;

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
