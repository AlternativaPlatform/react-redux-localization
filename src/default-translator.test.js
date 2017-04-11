import translate from './default-translator';

const translations = {
  bye: {
    en: 'Bye!',
    de: 'Tschüss!',
  },
  hello: {
    en: 'Hello, {} {}!',
  },
  lucky_number: {
    en: 7,
  },
  falsy: {
    en: 0,
    de: null,
    ru: false,
    cn: '',
  },
  undefined_translation: {
    en: undefined,
  }
}

const t = (key, locale, ...args) => translate(translations, key, locale, ...args);

test('translates', () => {
  expect(t('bye', 'en')).toBe('Bye!');
  expect(t('bye', 'de')).toBe('Tschüss!');
});

test('handles unknown translations', () => {
  expect(t('bye', 'ru')).toBe('bye[ru]');
  expect(t('how_are_you', 'en')).toBe('how_are_you[en]');
});

test('formats strings', () => {
  expect(t('hello', 'en', 'my dear', 'Fedor')).toBe('Hello, my dear Fedor!');
});

test('ignores formatting arguments for non-strings', () => {
  expect(t('lucky_number', 'en', '13')).toBe(7);
});

test('correctly translates falsy values', () => {
  expect(t('falsy', 'en')).toBe(0);
  expect(t('falsy', 'de')).toBe(null);
  expect(t('falsy', 'ru')).toBe(false);
  expect(t('falsy', 'cn')).toBe('');
});

test('substitutes presents undefined translations', () => {
  expect(t('undefined_translation', 'en')).toBe('undefined_translation[en]');
  expect(t('undefined_translation', 'ru')).toBe('undefined_translation[ru]');
});

test('handles formatting of unknown translations', () => {
  expect(t('hello', 'de', 'mein liebling', 'Fedor')).toBe('hello[de](mein liebling, Fedor)');
});
