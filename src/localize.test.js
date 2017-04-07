import React from 'react';
import testRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import localize from './localize';

const mockStore = configureStore();
const defaultTranslations = { hello: { de: 'Hallo, {}!' } };
const customTranslations = { de: { hello: 'Hallo, {}!' } };

console.log(Provider);
const render = (Component, storeState) => testRenderer.create(
  <Provider store={mockStore(storeState)}>
    <Component />
  </Provider>
);

test('localize with default settings', () => {
  const rendered = render(
    localize(defaultTranslations)(
      ({ l }) => <div>{l('hello', 'Fedor')}</div>
    ),
    { locale: 'de' }
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

test('localize with overriden settings', () => {
  console.log(customTranslations);
  const rendered = render(
    localize(
      customTranslations,
      state => state.language,
      'translate',
      (translations, key, locale, ...args) => translations[locale][key].replace('{}', args[0])
    )(
      ({ translate }) => <div>{translate('hello', 'Fedor')}</div>
    ),
    { language: 'de' }
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
