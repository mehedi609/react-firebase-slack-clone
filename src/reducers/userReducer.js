import { CLEAR_USER, SET_USER } from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

export const user_reducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload.currentUser,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      };
    default:
      return state;
  }
};
