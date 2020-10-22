import * as actionTypes from "../actions/actions";

const initialState = {
  isPlaying: false,
  playbackInstance: null,
  currentIndex: 0,
  volume: 1.0,
  isBuffering: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FILE:
      return {
        ...state,
      };
    case actionTypes.SET_IS_PLAYING:
      return !state.isPlaying;
    case actionTypes.SET_PLAYBACK_INSTANCE:
      return {
        isBuffering: action.isBuffering,
      };
    case actionTypes.SET_INDEX:
      return {
        ...state,
        currentIndex: action,
      };
    default:
      return state;
  }
};

export default reducer;
