export const SET_DATA = 'SET_DATA';
export const SET_USER = 'SET_USER';

export const setData = role => {
  return {
    type: SET_DATA,
    payload: role,
  };
};
export const setUser = role => {
  return {
    type: SET_USER,
    payload: role,
  };
};