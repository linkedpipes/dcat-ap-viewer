import React from "react";
import {formatNumber} from "@/app-services/formats";
import {getString} from "@/app-services/strings";
import {CATALOG_DELETE, getFormLink} from "@/app/form-links";
import {PropTypes} from "prop-types";

export const CatalogList = ({catalogs}) => (
  <div className="container p-3">
    <h4>
      {formatNumber(catalogs.length)}
            &nbsp;{getString("catalogs_found")}
    </h4>
    <hr/>
    <div className="row">
      {catalogs.map((catalog) => (
        <CatalogItem key={catalog.id} catalog={catalog}/>
      ))}
    </div>
  </div>
);

CatalogList.propTypes = {
  "catalogs": PropTypes.arrayOf(PropTypes.object).isRequired,
};

function CatalogItem({catalog}) {
  const {title, contactPoint, id} = catalog;
  const {name, email} = contactPoint;
  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
      <div className="card p-2">
        <div className="card-body px-2">
          <h5 className="card-title">
            <span className="pr-2">{catalog["publisherName"]}</span>
            <a href={DEREFERENCE_IRI + catalog["publisherIRI"]}
              target="_blank" rel="noopener noreferrer">
              <i className="material-icons md-18">open_in_new</i>
            </a>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="pr-2">{title}</span>
            <a href={DEREFERENCE_IRI + id} target="_blank"
              rel="noopener noreferrer">
              <i className="material-icons md-18">open_in_new</i>
            </a>
          </li>
          <li className="list-group-item">
            <a href={"mailto:" + email}>
              <i className="material-icons pr-2 md-24 center">email</i>
              {name}
            </a>
          </li>
          <li className="list-group-item">
            {catalog["homepage"] &&
                        <a href={catalog["homepage"]}
                          target="_blank" rel="noopener noreferrer" className="pr-2">
                          <i className="material-icons md-24"
                            style={{"color": "gray"}}>
                                home
                          </i>
                        </a>
            }
            <a href={catalog["endpointURL"]}
              target="_blank" rel="noopener noreferrer" className="pr-2">
              <i className="material-icons md-24"
                style={{"color": "gray"}}>
                                link
              </i>
            </a>
            <a href={getFormLink(CATALOG_DELETE, id)}
              target="_blank" rel="nofollow noopener noreferrer">
              <i className="material-icons md-24"
                style={{"color": "gray"}}>
                                delete_forever
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  "catalog": PropTypes.object.isRequired,
};


