import {
  SET_CALORIES,
  SET_DATA,
  SET_STEPS,
  SET_USER,
  SET_TARGET_STEPS,
  SET_IS_DARK_MODE,
  SET_CONNECTION,
} from './actions';

const initialState = {
  data: '',
  userDetails: {},
  calories: '',
  steps: '0',
  targetSteps: '5000',
  isDarkMode: true,
  connection: null,
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
        targetSteps: action.payload,
      };
    case SET_IS_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case SET_CONNECTION:
      return {
        ...state,
        connection: action.payload,
      };
  }
};

export default reducer;
