import {
  SET_CALORIES,
  SET_DATA,
  SET_STEPS,
  SET_USER,
  SET_TARGET_STEPS,
} from './actions';

const initialState = {
  data: '',
  userDetails: {},
  calories: '',
  steps: '',
  targetSteps: '5000',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SET_CALORIES:
      return {
        ...state,
        calories: action.payload,
      };
    case SET_STEPS:
      return {
        ...state,
        steps: action.payload,
      };
    case SET_TARGET_STEPS:
      return {
        ...state,
        steps: action.payload,
      };
  }
};

export default reducer;
