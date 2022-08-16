import { createStore } from 'redux';

const ACTION_FROM_NOTICE = 'actionToNotice';
const ACTION_FROM_COMMUNITY = 'actionToCommunity';

interface TableNavState {
  notice: number;
  community: number;
}

const tableNavReducer = (
  state: TableNavState = {
    notice: 0,
    community: 0,
  },
  action: any,
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

const tableNavStore = createStore(tableNavReducer);

const handleTableNav = (isNotice: boolean, idx: number) => {
  tableNavStore.dispatch({
    type: isNotice ? ACTION_FROM_NOTICE : ACTION_FROM_COMMUNITY,
    idx,
  });
};

export { tableNavStore, handleTableNav };
