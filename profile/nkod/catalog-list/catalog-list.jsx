import React, {useEffect} from "react";
import {PropTypes} from "prop-types";
import {useSelector, useDispatch} from "react-redux";

import {
  register,
  getRegisteredElement,
  selectT,
  selectTLabel,
  selectLanguage,
} from "../../client-api";
import {
  Status,
  fetchCatalogList,
  catalogsListSelector,
  ELEMENT_CATALOG_LIST,
} from "../../../client/catalog-list";
import {STATUS_FAILED, STATUS_LOADING} from "../nkod-component-names";
import {getGlobal} from "../../../client/app/globals";
import {getDeleteCatalogFormLink} from "../dcat-ap-forms";
//

const CatalogList = () => {
  const dispatch = useDispatch();
  const t = useSelector(selectT);
  const tLabel = useSelector(selectTLabel);
  const language = useSelector(selectLanguage);
  const data = useSelector(catalogsListSelector);
  useEffect(() => {
    if (data.status === Status.Undefined) {
      dispatch(fetchCatalogList());
    }
  }, []);
  //
  const LoadingView = getRegisteredElement(STATUS_LOADING);
  const FailedView = getRegisteredElement(STATUS_FAILED);
  switch (data.status) {
  case Status.Undefined:
  case Status.Loading:
    return (<LoadingView/>);
  case Status.Failed:
    return (<FailedView/>);
  case Status.Ready:
    return catalogListView(t, tLabel, language, data.catalogs);
  default:
    return null;
  }
};

function catalogListView(t, tLabel, language, catalogs) {
  return (
    <div className="container p-3">
      <h4>
        {t("catalogsFound", {"count": catalogs.length})}
      </h4>
      <hr/>
      <div className="row">
        {catalogs.map((catalog) => (
          <CatalogListItem
            key={catalog.iri}
            tLabel={tLabel}
            catalog={catalog}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

function CatalogListItem({tLabel, catalog, language}) {
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
              href={getDeleteCatalogFormLink(language, catalog.iri)}
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
  "tLabel": PropTypes.func.isRequired,
  "catalog": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": ELEMENT_CATALOG_LIST,
  "element": CatalogList,
});
