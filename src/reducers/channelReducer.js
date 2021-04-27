import { SET_CURRENT_CHANNEL } from '../actions/types';

const initialChannelState = {
  currentChannel: null,
};

export const channel_reducer = (
  state = initialChannelState,
  { type, payload }
) => {
  switch (type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload.currentChannel,
      };
    default:
      return state;
  }
};
