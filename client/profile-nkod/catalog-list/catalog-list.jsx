import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {
  Container, Card, CardBody, CardTitle,
  ListGroup, ListGroupItem, Row,
} from "reactstrap";

import {
  t, register, useCatalogListApi, getElement,
  NavigationContext, usePageTitle, useLabelApi, selectLiteral,
  configuration,
} from "../viewer-api";
import {getDeleteCatalogFormLink} from "../form/form-service";

import translations from "./catalog-list.json";

function CatalogList() {
  const {language} = useContext(NavigationContext);
  const data = useCatalogListApi(language);
  const selectLabel = useLabelApi();
  usePageTitle("page-title.catalogs");

  if (data.loading) {
    const LoadingView = getElement("application.loading").element;
    return (<LoadingView/>);
  }
  if (data.failed) {
    const FailedView = getElement("application.failed").element;
    return (<FailedView/>);
  }

  return (
    <Container className="p-3">
      <h4>
        {t("catalogsFound", {"count": data.catalogs.length})}
      </h4>
      <hr/>
      <Row>
        {data.catalogs.map((catalog) => (
          <CatalogListItem
            key={catalog.iri}
            selectLabel={selectLabel}
            catalog={catalog}
            language={language}
          />
        ))}
      </Row>
    </Container>
  );
}

register({
  "url": "/catalogs",
  "name": "catalog-list.view",
  "view": CatalogList,
  "navigation": {
    "cs": {
      "/catalogs": "/lokální-katalogy",
    },
    "en": {
      "/catalogs": "/local-catalogs",
    },
  },
  "translations": translations,
});

function CatalogListItem(props) {
  const catalog = props.catalog;

  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
      <Card className="p-2">
        <CardBody className="px-2">
          <CardTitle tag="h5">
            <span className="pr-2">
              {props.selectLabel(catalog.publisher)}
            </span>
            <a
              href={configuration.dereferenceUrlPrefix + catalog.publisher}
              target="_blank"
              rel="noopener noreferrer">
              <i className="material-icons md-18">
                open_in_new
              </i>
            </a>
          </CardTitle>
        </CardBody>
        <ListGroup flush={true}>
          <ListGroupItem>
            <span className="pr-2">
              {props.selectLabel(catalog.iri)}
            </span>
            <a
              href={configuration.dereferenceUrlPrefix + catalog.iri}
              target="_blank"
              rel="noopener noreferrer">
              <i className="material-icons md-18">
                open_in_new
              </i>
            </a>
          </ListGroupItem>
          <ListGroupItem>
            <a href={catalog.contactEmail}>
              <i className="material-icons pr-2 md-24 center">
                email
              </i>
              {
                selectLiteral(props.language, catalog.title)
                || catalog.contactEmail
              }
            </a>
          </ListGroupItem>
          <ListGroupItem>
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
              href={getDeleteCatalogFormLink(props.language, catalog.iri)}
              target="_blank"
              rel="nofollow noopener noreferrer">
              <i
                className="material-icons md-24"
                style={{"color": "gray"}}
              >
                delete_forever
              </i>
            </a>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

CatalogListItem.propTypes = {
  "selectLabel": PropTypes.func.isRequired,
  "catalog": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};
