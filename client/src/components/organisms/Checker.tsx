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
} from '~/others/store';

import { useNavigate, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';

interface CheckerProps {
  accessTokenState: accessTokenState;
  profileData: ProfileState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState, profileData }) => {
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

  const getProfileList = async () => {
    try {
      const res = await myAxios('get', 'api/v1/accounts/profiles', null, true, accountAccessToken);

      const { id, name, lineName, houseName } = res.data.response.list[0];
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
    // console.log(accountAccessToken);
    // if (accountAccessToken !== '') {
    //   navigate('/');
    // }

    if (accountAccessToken === '') {
      navigate('/sign');
    } else {
      getProfileList();
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
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(Checker);
