import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {t, createUrl} from "../viewer-api";
import configuration from "../profile-configuration";

function Keywords(props) {
  const filteredKeywords = props.keywords
    .filter(item => item[props.language])
    .map(item => item[props.language]);
  if (filteredKeywords.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <span className="visually-hidden">{t("keywords")}:</span>
      {filteredKeywords.map((keyword) => {
        if (configuration.disableDatasetList) {
          return (
            <spam
              className="badge-info m-1"
              style={{"padding":"0.2rem"}}
            >
              {keyword}
            </spam>
          );
        }
        return (
          <Link
            className="btn badge-info m-1"
            to={datasetListUrl(props.language, keyword)}
            role="button"
            key={keyword}
          >
            {keyword}
          </Link>
        );
      })}
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
  return createUrl(language, "/datasets", {"keywords": iri});
}
