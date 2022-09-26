import * as actionTypes from './types';

export const getTranslatedText = (text) => {
  return { type: actionTypes.GET_TRANSLATED_TEXT, payload: text };
};

export const setTextToBeTranslated = (text) => {
  return { type: actionTypes.SET_TEXT_TO_BE_TRANSLATED, payload: text };
};

export const setHistory = (item) => {
  return { type: actionTypes.SET_HISTORY, payload: item };
};

export const clearHistory = () => {
  return { type: actionTypes.CLEAR_HISTORY };
};
