import defaultTranslator from './default-translator';

export default (translations, translator = defaultTranslator) =>
  (key, locale) => translator(translations, key, locale);


