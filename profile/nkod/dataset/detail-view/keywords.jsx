import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import React from "react";
import {
  URL_DATASET_LIST,
  QUERY_DATASET_LIST_KEYWORD,
} from "../../../client-api";
import {register} from "../../../client-api";
import {DATASET_DETAIL_KEYWORDS} from "../../nkod-component-names";

/**
 * Show all keywords in given language.
 */
function Keywords({t, tUrl, keywords, language}) {
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
          className="btn badge-info mx-1"
          to={tUrl(URL_DATASET_LIST, {[QUERY_DATASET_LIST_KEYWORD]: keyword})}
          role="button"
          key={keyword}
        >
          {keyword}
        </Link>
      ))}
      <hr/>
    </div>
  );
}

Keywords.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "keywords": PropTypes.array.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": DATASET_DETAIL_KEYWORDS,
  "element": Keywords,
});
