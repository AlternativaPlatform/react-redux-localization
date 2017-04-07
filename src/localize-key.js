import defaultTranslator from './default-translator';

export default (translations, translator = defaultTranslator) =>
  (key, locale, ...extraArgs) => translator(translations, key, locale, ...extraArgs);


