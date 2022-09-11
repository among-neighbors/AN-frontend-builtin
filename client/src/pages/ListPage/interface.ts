import { accessTokenState, ProfileState } from '~/others/store';

interface ListPageProps {
  type: string;
  accessToken: accessTokenState;
  isReadyForRequestAPI: boolean;
  mode: string;
  profileData: ProfileState;
}

export { ListPageProps };
