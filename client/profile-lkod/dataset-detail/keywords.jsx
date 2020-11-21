import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {t, createUrl} from "../viewer-api";

function Keywords(props) {
  const filteredKeywords = props.keywords
    .filter(item => item[props.language])
    .map(item => item[props.language]);
  if (filteredKeywords.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <span className="sr-only">{t("keywords") + ":"}</span>
      {filteredKeywords.map((keyword) => (
        <Link
          className="btn badge-info mx-1"
          to={datasetListUrl(props.language, keyword)}
          role="button"
          key={keyword}
        >
          {keyword}
        </Link>
      ))}
      <hr/>
    </React.Fragment>
  );
}

Keywords.propTypes = {
  "language": PropTypes.string.isRequired,
  "keywords": PropTypes.array.isRequired,
};

export default Keywords;

function datasetListUrl(language, iri) {
  return createUrl(language, "/datasets", {"keyword": iri});
}
