export const SET_DATA = 'SET_DATA';
export const SET_USER = 'SET_USER';
export const SET_CALORIES = 'SET_CALORIES';
export const SET_STEPS = 'SET_STEPS';
export const SET_TARGET_STEPS = 'SET_TARGET_STEPS';
export const SET_IS_DARK_MODE = 'SET_IS_DARK_MODE';
export const SET_CONNECTION = 'SET_CONNECTION';

export const setData = (role) => {
  return {
    type: SET_DATA,
    payload: role,
  };
};
export const setUser = (role) => {
  return {
    type: SET_USER,
    payload: role,
  };
};
export const setReduxSteps = (role) => {
  return {
    type: SET_STEPS,
    payload: role,
  };
};
export const setReduxCalories = (role) => {
  return {
    type: SET_STEPS,
    payload: role,
  };
};
export const setTargetSteps = (role) => {
  return {
    type: SET_TARGET_STEPS,
    payload: role,
  };
};
export const setIsDarkMode = (role) => {
  return {
    type: SET_IS_DARK_MODE,
    payload: role,
  };
};
export const setConnection = role => {
  return {
    type: SET_CONNECTION,
    payload: role,
  };
};
