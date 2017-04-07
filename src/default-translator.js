import format from 'string-format';

export default (translations, key, locale, ...args) => {
  const value = translations[key] && translations[key][locale];
  if (value) {
    if (typeof value === 'string') return format(value, ...args);
    return value;
  }
  if (args && args.length) return `${key}[${locale}](${args.join(', ')})`;
  return `${key}[${locale}]`;
}
