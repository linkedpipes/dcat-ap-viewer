//
// This file contain global properties as provided in the configuration.
//

declare var DEF_DEFAULT_PAGE_TITLE: string;

declare var DEF_PAGE_TITLE_PREFIX: string;

declare var DEF_PAGE_TITLE_SUFFIX: string;

declare var DEF_FORM_URL: string;

declare var DEF_URL_BASE: string;

declare var DEF_DEREFERENCE_PREFIX: string;

export const PAGE_TITLE_DEFAULT = "PAGE_TITLE_DEFAULT";

export const PAGE_TITLE_PREFIX = "PAGE_TITLE_PREFIX";

export const PAGE_TITLE_SUFFIX = "PAGE_TITLE_SUFFIX";

export const FORM_URL = "FORM_URL";

export const BASE_CLIENT_URL = "BASE_CLIENT_URL";

export const BASE_CLIENT_URL_PREFIX = "BASE_CLIENT_URL_PREFIX";

export const PAGE_SIZE_DEFAULT = "PAGE_SIZE_DEFAULT";

export const DATASET_SORT_DEFAULT = "DATASET_SORT_DEFAULT";

export const DEFAULT_FACET_SIZE = "DEFAULT_FACET_SIZE";

export const MAIN_LANGUAGE = "MAIN_LANGUAGE";

const values: { [key: string]: any } = {
  [PAGE_TITLE_DEFAULT]: DEF_DEFAULT_PAGE_TITLE,
  [PAGE_TITLE_PREFIX]: DEF_PAGE_TITLE_PREFIX,
  [PAGE_TITLE_SUFFIX]: DEF_PAGE_TITLE_SUFFIX,
  [FORM_URL]: DEF_FORM_URL,
  [BASE_CLIENT_URL]: DEF_URL_BASE,
  [BASE_CLIENT_URL_PREFIX]: DEF_DEREFERENCE_PREFIX,
  [PAGE_SIZE_DEFAULT]: 10,
  [DATASET_SORT_DEFAULT]: "title asc",
  [DEFAULT_FACET_SIZE]: 7,
  [MAIN_LANGUAGE]: "cs",
};

export function getGlobal<T>(key: string, defaultValue?: T): T | undefined {
  const value = values[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
}
