import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  getReadyForRequestAPI,
  handleRefreshAccountAccessToken,
  handlePutProfile,
  RootState,
  ProfileState,
  AspectOldState,
} from '~/others/store';

import { useNavigate, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import HelpCallConnectSocket from './HelpCallConnectSocket';

interface CheckerProps {
  accessTokenState: accessTokenState;
  profileData: ProfileState;
  AspectOldState: AspectOldState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState, AspectOldState }) => {
  const { accountAccessToken } = accessTokenState;
  const { aspectedOld } = AspectOldState;
  const [accountKey, setAccountKey] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAccountLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/account-token', null, true);
      handleRefreshAccountAccessToken(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setAccountKey(true);
    }
  };

  const getProfile = async () => {
    try {
      const res = await myAxios('get', 'api/v1/accounts', null, true, accountAccessToken);
      console.log('hkhkhkhk', res.data.response);
      const { id, name, lineName, houseName } = res.data.response;

      handlePutProfile({
        id,
        name,
        lineName,
        houseName,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAccountLogin();
  }, []);

  useEffect(() => {
    if (!accountKey) return;
    getReadyForRequestAPI();

    if (accountAccessToken === '') {
      navigate('/sign');
    } else {
      getProfile();
    }

    if (accountAccessToken !== '') {
      if (location.pathname === '/sign') navigate('/faceDetection');
      if (aspectedOld === '') navigate('/faceDetection');
    }
  }, [accountKey, location.pathname]);

  useInterval(checkAccountLogin, accountAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);

  if (accountKey && accountAccessToken !== '') {
    return <HelpCallConnectSocket />;
  }
  return <></>;
};

const TIME_FOR_REFRESH_TOKEN = 10000;

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
    profileData: state.profileReducer,
    AspectOldState: state.modeReducer,
  };
};

export default connect(mapStateToProps)(Checker);
