import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import React from "react";
import {
  URL_DATASET_LIST,
  QUERY_DATASET_LIST_KEYWORD,
} from "../../../client-api";

/**
 * Show all keywords in given language.
 */
export default function Keywords({t, tUrl, keywords, language}) {
  const filteredKeywords = keywords
    .filter(item => item[language])
    .map(item => item[language]);
  if (filteredKeywords.length === 0) {
    return null;
  }
  return (
    <div>
      <span className="sr-only">{t("keywords") + ":"}</span>
      {filteredKeywords.map((keyword) => (
        <Link
          className="btn btn-light mx-1"
          to={tUrl(URL_DATASET_LIST, {[QUERY_DATASET_LIST_KEYWORD]: keyword})}
          role="button"
          key={keyword}
        >
          {keyword}
        </Link>
      ))}
      <hr/>
    </div>
  )
}

Keywords.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "keywords": PropTypes.array.isRequired,
  "language": PropTypes.string.isRequired,
};
