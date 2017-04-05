const SET_LOCALE = 'react-redux-localization/set-locale';

export const setLocale = locale => ({ type: SET_LOCALE, locale });

export const getLocale = state => state.locale;

export const localeReducer = (state = 'en', action) => {
  if (action.type === SET_LOCALE) return action.locale;
  return state;
}
