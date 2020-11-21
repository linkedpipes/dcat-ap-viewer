import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t} from "../../viewer-api";

export default function DataServiceConformsTo(props) {
  const conformsTo = props.dataService.dataServiceConformsTo;
  if (conformsTo.length === 0) {
    return null;
  }
  return (
    <ListGroupItem className="px-2">
      {conformsTo.map(iri => (
        <div key={iri}>
          <a
            href={iri}
            title={t("followLink")}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            {t("access.conformsTo")}
          </a>
        </div>
      ))}
    </ListGroupItem>
  );
}

DataServiceConformsTo.propTypes = {
  "dataService": PropTypes.object.isRequired,
};
