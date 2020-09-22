import {
  SET_DATA,
  SET_USER,
} from './actions';

const initialState = {
  data:'',
  userDetails:{},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
  }
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
  }
};

export default reducer;
