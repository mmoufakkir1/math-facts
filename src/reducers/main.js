import { combineReducers } from 'redux';
import {
  HEADER_STATE,
} from '../actions/main';

export const initialHeaderState = {
  header: 'Math Facts'
}

const getheader = (state = initialHeaderState, action) => {
  const { type, payload } = action;

  switch (type) {

    case HEADER_STATE:
      {
        return {
          ...state,
          header: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}

const main = combineReducers({
  getheader
});
export default main;