export const SET_DATA = 'SET_DATA';

export const setData = role => {
  return {
    type: SET_DATA,
    payload: role,
  };
};