import { combineReducers } from 'redux';
import {
  HEADER_STATE,
  OPERATION_STATE,
  RESULT_STATE,
  EQUATION_COUNT_STATE,
  EQUATIONS_STATE,
  MODAL_EQUATION_STATE,
  STEPPER_STATE
} from '../actions/main';

export const initialHeaderState = {
  header: 'Math Facts'
}

export const initialOperationState = {
  operation: ''
}

export const initialResultState = {
  result: ''
}

export const initialEquationCountState = {
  count: 10
}

export const initialEquationsState = {
  equations: []
}


export const initialModalEquationsState = {
  open: false
}


export const initialStepperState = {
  step: 0
}

const getStepper = (state = initialStepperState, action) => {
  const { type, payload } = action;

  switch (type) {

    case STEPPER_STATE:
      {
        return {
          ...state,
          step: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}

const getHeader = (state = initialHeaderState, action) => {
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


const getResult = (state = initialResultState, action) => {
  const { type, payload } = action;

  switch (type) {

    case RESULT_STATE:
      {
        return {
          ...state,
          result: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}

const getOperation = (state = initialOperationState, action) => {
  const { type, payload } = action;

  switch (type) {

    case OPERATION_STATE:
      {
        return {
          ...state,
          operation: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}


const getEquationCount = (state = initialEquationCountState, action) => {
  const { type, payload } = action;

  switch (type) {

    case EQUATION_COUNT_STATE:
      {
        return {
          ...state,
          count: payload,
        }
      }

    default:
      {
        return state;
      }
  }
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

const getModalEquations = (state = initialModalEquationsState, action) => {
  const { type, payload } = action;

  switch (type) {

    case MODAL_EQUATION_STATE:
      {
        return {
          ...state,
          open: payload,
        }
      }

    default:
      {
        return state;
      }
  }
}

const main = combineReducers({
  getHeader,
  getOperation,
  getResult,
  getEquationCount,
  getEquations,
  getModalEquations,
  getStepper
});
export default main;