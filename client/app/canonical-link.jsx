import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {Helmet} from "react-helmet";
import {selectUrl, createUrl, getAllLanguages} from "./navigation";
import {getGlobal, MAIN_LANGUAGE} from "./globals";
import {
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
} from "./component-list";

function CanonicalLink({url}) {
  const mainLanguage = getGlobal(MAIN_LANGUAGE);
  return (
    <Helmet>
      <link
        rel="canonical"
        href={createUrl(
          url.path,
          mainLanguage,
          prepareQuery(url, mainLanguage, mainLanguage))
        }
      />
      {
        getAllLanguages().map((lang) => (
          <link
            rel="alternate"
            href={createUrl(
              url.path,
              lang,
              prepareQuery(url, mainLanguage, lang))
            }
            hrefLang={lang}
            key={lang}
          />
        ))
      }
    </Helmet>
  );
}

CanonicalLink.propTypes = {
  "url": PropTypes.object.isRequired,
};

export default connect((state) => ({
  "url": selectUrl(state),
}))(CanonicalLink);

/**
 * We do not translate keywords.
 */
function prepareQuery(url, mainLanguage, language) {
  if (!includeQuery(url)) {
    return {};
  }
  if (mainLanguage === language) {
    return url.query;
  } else {
    return {
      ...url.query,
      [QUERY_DATASET_LIST_KEYWORD]: undefined,
    };
  }
}

function includeQuery(url) {
  if (url.query[QUERY_DATASET_LIST_FORMAT] !== undefined) {
    return false;
  }
  const values = [
    ...asArray(url.query[QUERY_DATASET_LIST_PUBLISHER]),
    ...asArray(url.query[QUERY_DATASET_LIST_THEME]),
    ...asArray(url.query[QUERY_DATASET_LIST_KEYWORD]),
  ];
  return values.length === 1;
}

function asArray(value) {
  if (value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}
