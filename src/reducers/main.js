import { combineReducers } from 'redux';
import {
  EQUATIONS_STATE,
} from '../actions/main';


export const initialEquationsState = {
  equations: []
}


const getEquations = (state = initialEquationsState, action) => {
  const { type, payload } = action;

  switch (type) {

    case EQUATIONS_STATE:
      {
        return {
          ...state,
          equations: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}

const main = combineReducers({
  getEquations
});
export default main;