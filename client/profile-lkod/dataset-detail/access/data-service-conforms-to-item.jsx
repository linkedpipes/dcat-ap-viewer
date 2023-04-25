import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, translateString, NavigationContext, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function DataServiceConformsTo(props) {
  const {language} = useContext(NavigationContext);
  const conformsTo = props.dataService.dataServiceConformsTo;
  if (conformsTo.length === 0) {
    return null;
  }
  const measureDefinitions = [{
    "measureOf": QUALITY.conformsTo,
    "labelTrue": "access.conformsToQualityTrue",
    "labelFalse": "access.conformsToQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }
  // Disabled CORS quality measure. We are not using this as of now.
  // ,{
  //   "measureOf": QUALITY.conformsToCors,
  //   "labelTrue": "access.conformsToQualityCorsTrue",
  //   "labelFalse": "access.conformsToQualityCorsFalse",
  //   "iconTrue": "http",
  //   "iconFalse": "http",
  // }
  ];
  return (
    <ListGroupItem className="px-2">
      {conformsTo.map(iri => (
        <div key={iri} style={{"height": "2rem"}}>
          <a
            href={iri}
            title={translateString(language, "followLink")}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="card-link"
          >
            {t("access.conformsTo")}
          </a>
          <QualityIconsForMeasures
            quality={props.quality}
            measureDefinitions={measureDefinitions}
            object={iri}
          />
        </div>
      ))}
    </ListGroupItem>
  );
}

DataServiceConformsTo.propTypes = {
  "dataService": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
