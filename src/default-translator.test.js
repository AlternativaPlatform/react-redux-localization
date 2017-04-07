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

test('handles formatting of unknown translations', () => {
  expect(t('hello', 'de', 'mein liebling', 'Fedor')).toBe('hello[de](mein liebling, Fedor)');
});
