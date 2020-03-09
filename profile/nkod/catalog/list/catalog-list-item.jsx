import {PropTypes} from "prop-types";
import React from "react";
import {
  getFormLink,
  CATALOG_DELETE,
} from "../../../../client/form/dataset";
import {getGlobal} from "../../../client-api";

function CatalogListItem({catalog, tLabel, fetchLabels, language}) {
  fetchLabels([catalog.publisher, catalog.contact]);
  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
      <div className="card p-2">
        <div className="card-body px-2">
          <h5 className="card-title">
            <span className="pr-2">
              {tLabel(catalog.publisher)}
            </span>
            <a
              href={getGlobal("deference-iri", "") + catalog.publisher}
              target="_blank"
              rel="noopener noreferrer">
              <i className="material-icons md-18">
                open_in_new
              </i>
            </a>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="pr-2">
              {tLabel(catalog.iri)}
            </span>
            <a
              href={catalog.iri}
              target="_blank"
              rel="noopener noreferrer">
              <i className="material-icons md-18">
                open_in_new
              </i>
            </a>
          </li>
          <li className="list-group-item">
            <a href={"mailto:" + catalog.contactEmail}>
              <i className="material-icons pr-2 md-24 center">
                email
              </i>
              {tLabel(catalog.contact, catalog.contactEmail)}
            </a>
          </li>
          <li className="list-group-item">
            {catalog.homepage &&
            <a
              href={catalog.homepage}
              className="pr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="material-icons md-24"
                style={{"color": "gray"}}>
                home
              </i>
            </a>
            }
            <a
              href={catalog.endpoint}
              className="pr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="material-icons md-24"
                style={{"color": "gray"}}>
                link
              </i>
            </a>
            <a
              href={getFormLink(language, CATALOG_DELETE, catalog.iri)}
              target="_blank"
              rel="nofollow noopener noreferrer">
              <i
                className="material-icons md-24"
                style={{"color": "gray"}}
              >
                delete_forever
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

CatalogListItem.propTypes = {
  "catalog": PropTypes.object.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
};

export default CatalogListItem;