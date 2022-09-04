import { combineReducers, createStore } from 'redux';

const ACTION_FROM_NOTICE = 'actionToNotice',
  ACTION_FROM_COMMUNITY = 'actionToCommunity';

const ACTION_TO_HANDLE_HELP_SIDE_BAR = 'actionToHandleHelpSideBar',
  ACTION_TO_CLOSE_HELP_SIDE_BAR = 'actionToCloseHelpSideBar';

const ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN = 'actionToRefreshAccountAccessToken',
  ACTION_TO_CHECK_FACE_DETECTION = 'actionToCheckFaceDetecion';

interface TableNavState {
  [key: string]: number;
  notice: number;
  community: number;
}

interface accessTokenState {
  accountAccessToken: string;
  isFaceDetectionOK: boolean;
}

interface RootState {
  helpSideBarReducer: boolean;
  tableNavReducer: TableNavState;
  accessTokenReducer: accessTokenState;
}

const tableNavReducer = (
  state: TableNavState = {
    notice: 0,
    community: 0,
  },
  action: {
    type: string;
    idx: number;
  },
) => {
  switch (action.type) {
    case ACTION_FROM_COMMUNITY:
      return {
        notice: state.notice,
        community: action.idx,
      };
    case ACTION_FROM_NOTICE:
      return {
        notice: action.idx,
        community: state.community,
      };
    default:
      return state;
  }
};

const helpSideBarReducer = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TO_HANDLE_HELP_SIDE_BAR:
      return !state;
    case ACTION_TO_CLOSE_HELP_SIDE_BAR:
      return false;
    default:
      return state;
  }
};

const accessTokenReducer = (
  state = {
    accountAccessToken: '',
    isFaceDetectionOK: false,
  },
  action: { type: string; accessToken: string; isFaceDetection: boolean },
) => {
  switch (action.type) {
    case ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN:
      return {
        accountAccessToken: action.accessToken,
        isFaceDetectionOK: state.isFaceDetectionOK,
      };
    case ACTION_TO_CHECK_FACE_DETECTION:
      return {
        accountAccessToken: state.accountAccessToken,
        isFaceDetectionOK: action.isFaceDetection,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tableNavReducer,
  helpSideBarReducer,
  accessTokenReducer,
});

const store = createStore(rootReducer);

const handleTableNav = (isNotice: boolean, idx: number) => {
  store.dispatch({
    type: isNotice ? ACTION_FROM_NOTICE : ACTION_FROM_COMMUNITY,
    idx,
  });
};

const handleHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_HANDLE_HELP_SIDE_BAR,
  });
};

const closeHelpSideBar = () => {
  store.dispatch({
    type: ACTION_TO_CLOSE_HELP_SIDE_BAR,
  });
};

const handleRefreshAccountAccessToken = (accessToken: string) => {
  store.dispatch({
    type: ACTION_TO_REFRESH_ACCOUNT_ACCESS_TOKEN,
    accessToken,
  });
};

const handleRefreshIsFaceDetectionOK = (isFaceDetection: boolean) => {
  store.dispatch({
    type: ACTION_TO_CHECK_FACE_DETECTION,
    isFaceDetection,
  });
};

export {
  store,
  handleTableNav,
  handleHelpSideBar,
  closeHelpSideBar,
  handleRefreshAccountAccessToken,
  handleRefreshIsFaceDetectionOK,
  RootState,
  accessTokenState,
};
