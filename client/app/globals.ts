//
// This file contain global properties as provided in the configuration.
//

declare var DEF_PAGE_TITLE_PREFIX: string;

declare var DEF_PAGE_TITLE_SUFFIX: string;

declare var DEF_FORM_URL: string;

declare var DEF_URL_BASE: string;

declare var DEF_DEREFERENCE_PREFIX: string;

export const PAGE_TITLE_PREFIX = "PAGE_TITLE_PREFIX";

export const PAGE_TITLE_SUFFIX = "PAGE_TITLE_SUFFIX";

export const FORM_URL = "FORM_URL";

export const BASE_CLIENT_URL = "BASE_CLIENT_URL";

export const BASE_CLIENT_URL_PREFIX = "BASE_CLIENT_URL_PREFIX";

const values: { [key: string]: any } = {
  [PAGE_TITLE_PREFIX]: DEF_PAGE_TITLE_PREFIX,
  [PAGE_TITLE_SUFFIX]: DEF_PAGE_TITLE_SUFFIX,
  [FORM_URL]: DEF_FORM_URL,
  [BASE_CLIENT_URL]: DEF_URL_BASE,
  [BASE_CLIENT_URL_PREFIX]: DEF_DEREFERENCE_PREFIX,
  "main-language": "cs",
  "page-size-default": 10,
  "dataset-list-sort": undefined,
  "dataset-list-sort-default": "title asc",
};

export function getGlobal<T>(key: string, defaultValue?: T): T | undefined {
  if (values[key]) {
    return values[key];
  }
  return defaultValue;
}