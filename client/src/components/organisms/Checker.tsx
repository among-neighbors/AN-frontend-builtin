import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  getReadyForRequestAPI,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  RootState,
} from '~/others/store';

import { useNavigate, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  const { accountAccessToken, profileAccessToken } = accessTokenState;
  const [accountKey, setAccountKey] = useState(false);
  const [profileKey, setProfileKey] = useState(false);
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

  useEffect(() => {
    checkAccountLogin();
  }, []);

  useEffect(() => {
    if (!accountKey) return;
    getReadyForRequestAPI();
    // if (accountAccessToken !== '') {
    //   navigate('/');
    // }
    if (accountAccessToken === '') {
      const isAllowPath = allowPath.some((path) => location.pathname === path);
      if (!isAllowPath) navigate('/sign');
    }
  }, [accountKey, profileKey, location.pathname]);

  useInterval(checkAccountLogin, accountAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);

  return <></>;
};

const allowPath = ['/', '/sign'];

const TIME_FOR_REFRESH_TOKEN = 10000;

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
