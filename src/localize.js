import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import defaultTranslator from './default-translator';
import { getLocale } from './locale-reducer';

export default (
  translations,
  mapStateToLocale = getLocale,
  propName = 'l',
  translator = defaultTranslator,
) => {
  const makeTranslator = createSelector(
    locale => locale,
    locale => key => translator(translations, key, locale)
  );

  const mapStateToProps = state => ({
    [propName]: makeTranslator(mapStateToLocale(state)),
  });

  return WrappedComponent => connect(
    mapStateToProps,
    null,
    null,
    { getDisplayName: name => `Localized(${name})` }
  )(WrappedComponent);
}

