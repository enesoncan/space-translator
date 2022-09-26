import * as actionTypes from './types';

const initialState = {
  translatedText: '',
  textToBeTranslated: '',
  history: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TRANSLATED_TEXT:
      return {
        ...state,
        translatedText: action.payload,
      };

    case actionTypes.SET_TEXT_TO_BE_TRANSLATED:
      return {
        ...state,
        textToBeTranslated: action.payload,
      };

    case actionTypes.SET_HISTORY: {
      let { history: historyArr } = state;

      historyArr = historyArr.concat(action.payload);

      return {
        ...state,
        history: historyArr,
      };
    }

    case actionTypes.CLEAR_HISTORY: {
      return {
        ...state,
        history: [],
      };
    }
    default:
      return state;
  }
}
