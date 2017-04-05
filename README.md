React Redux Localization
==============================

A high-order React Component which provides translation function to wrapped Components. Gets current locale from Redux store. 

## Installation

```
npm install --save react-redux-localization
```

## Usage

By default works in a way which matches my personal preferences (check API for possible customizations): 
 * Gets current locale from `state.locale`. 
 * Component prop name for translation function is `l`.
 * Translations are supposed to be `json` with the following scheme:

    ```
    { 
      "hello": {
         "en": "Hello!",
         "de": "Hallo!",
         "ru": "Привет!"
       },
       ...
    }
    ```

Provides `localeReducer` reducer to jack into your reducers tree, `setLocale` action and `getLocale` selector.

Also provides `localizeKey` for the cases of localizing values outside of Redux flow, e.g. translating values at back-end. 

All in all in terms of code it looks like:

```javascript

// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { localeReducer } from 'react-redux-localization';
import Greeting from './greeting';
import Switcher from './switcher';

const rootReducer = combineReducers({ locale: localeReducer });
const store = createStore(rootReducer);

const App = () => (
  <div>
    <Switcher />
    <Greeting />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// greeting.js

import React from 'react';
import { localize, localizeKey } from 'react-redux-localization';
import translations from './greeting-translations.json';

const yo = localizeKey(translations)('untranslatable_greeting', 'en');

const Greeting = ({ l }) => (
  <div>
    <h1>{yo}</h1>
    <h1>{l('hello')}</h1>
  </div>
);

export default localize(translations)(Greeting);


// switcher.js

import React from 'react';
import { connect } from 'react-redux';
import { setLocale, getLocale } from 'react-redux-localization';

const locales = ['en', 'de', 'ru'];

const Switcher = ({ locale, chooseLocale }) => (
  <div>
    {locales.map(loc => (
      <input
        key={loc}
        type='button'
        value={loc}
        onClick={() => chooseLocale(loc)}
        disabled={loc === locale}
      />
    ))}
  </div>
);

const mapStateToProps = state => ({ locale: getLocale(state) });
const mapDispatchToProps = dispatch => ({ chooseLocale: locale => dispatch(setLocale(locale)) });

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);


// greeting-translations.json

{
  "hello": {
    "en": "Hello!",
    "de": "Hallo!",
    "ru": "Привет!"
  },
  "untranslatable_greeting": {
    "en": "Yo!"
  },
}
```

## API

### `localize(translations, [mapStateToLocale], [propName], [translator])`

Localizes React Component and connects it to Redux store so that when locale is changed in Redux store Component will be redrawn in new language.

#### Arguments

 * `translations` *(Anything)* A function or an object or whatever you what which will be passed to `translator` to get localized value for a given key out of it. In case of using default `translator` an object of following shape should be passed as `translations` argument:

    ```
    {
      "hello": {
        "en": "Hello!",
        "de": "Hallo!",
        "ru": "Привет!"
      },
      ...
    }
    ```
 * `[mapStateToLocale: state => locale]` *(Function)* A function which gets current locale from Redux state. If you omit it, default behaviour will be used, i.e. `getLocale` selector.
 * `[propName]` *(String)* The name under which translation function will appear in wrapped Component's props. If omitted, name `l` will be used.
 * `[translator: (translations, key, locale) => localizedValue]` *(Function)* If this function is specified then it will be used to get `localizedValue` for given `key` and `language` from `translations`. By specifing custom `translator` any shape, type and taste of `translations` format can be used: differently shaped JSON, Yaml, custom binary format, name it.

#### Returns

A high-order React Component which passes localization function to wrapped Component.


### `localizeKey(translations, [translator])`

Creates localization function for given set of translations.

#### Arguments

 * `translations` *(Anything)* Same as `translations` in `localize`.
 * `[translator(translations, key, locale): localizedValue]` *(Function)* Same as `translator` in `localize`.

#### Returns

Function `(key, locale) => localizedValue` which can be used to get `localizedValue` in given `locale`.

## Your lib is buggy!

PRs and issue-reports are welcome!

## License

Apache-2.0
