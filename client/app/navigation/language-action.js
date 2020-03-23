export const SET_LANGUAGE = "SET_LANGUAGE";

export function setLanguage(language) {
  // Also update language form HTML root element.
  document.documentElement.lang = language;
  return {
    "type": SET_LANGUAGE,
    "language": language,
  };
}
