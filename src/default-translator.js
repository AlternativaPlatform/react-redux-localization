export default (translations, key, language) => {
  const value = translations[key] && translations[key][language];
  return value || `${key}[${lang}]`;
}
