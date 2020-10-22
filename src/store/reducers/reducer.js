import { LOAD } from "../constants/index";

const initialState = {
  isPlaying: false,
  playbackInstance: null,
  currentIndex: 0,
  volume: 1.0,
  isBuffering: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state
      };
      case 'PLAYING':
        return {
          isPlaying: !state.isPlaying
        };
    default:
      return state;
  }
};

export default reducer;
