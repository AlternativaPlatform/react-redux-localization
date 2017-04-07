import localizeKey from './localize-key';
import defaultTranslator from './default-translator';

jest.mock('./default-translator', () => jest.fn(() => 'default hello'));
const custonTranslator = jest.fn(() => 'custom hello');

const translations = {};

test('uses default translator', () => {
  const translation = localizeKey(translations)('hello', 'en', 'my dear', 'Fedor');
  expect(translation).toBe('default hello');
  expect(defaultTranslator).toBeCalledWith(translations, 'hello', 'en', 'my dear', 'Fedor');
});

test('uses custom translator', () => {
  const translation = localizeKey(translations, custonTranslator)('hello', 'en', 'my dear', 'Fedor');
  expect(translation).toBe('custom hello');
  expect(custonTranslator).toBeCalledWith(translations, 'hello', 'en', 'my dear', 'Fedor');
});
