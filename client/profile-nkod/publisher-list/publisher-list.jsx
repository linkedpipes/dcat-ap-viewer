import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import {
  Container, Card, CardBody, CardTitle,
  ListGroup, ListGroupItem, Row,
} from "reactstrap";

import {
  t, register, getElement,
  NavigationContext, usePageTitle, useLabelApi,
  usePublisherListApi, createUrl, formatNumber,
} from "../viewer-api";

import translations from "./publisher-list.json";

function PublisherList() {
  const {language} = useContext(NavigationContext);
  const data = usePublisherListApi(language);
  const selectLabel = useLabelApi();
  usePageTitle("page-title.publishers");

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
        {t("publishersFound", {"count": formatNumber(data.publishers.length)})}
      </h4>
      <hr/>
      <Row>
        {data.publishers.map((publisher) => (
          <PublisherListItem
            key={publisher.iri}
            selectLabel={selectLabel}
            language={language}
            publisher={publisher}
          />
        ))}
      </Row>
    </Container>
  );
}

register({
  "url": "/publishers",
  "name": "publishers-list.view",
  "view": PublisherList,
  "navigation": {
    "cs": {
      "/publishers": "/poskytovatelé",
    },
    "en": {
      "/publishers": "/publishers",
    },
  },
  "translations": translations,
});

function PublisherListItem(props) {
  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 
                    col-xl-3 col-xxl-2 mb-3 d-flex">
      <Card className="p-2 flex-fill">
        <CardBody className="px-2">
          <CardTitle tag="h5">
            <Link to={getPublisherSearchLink(props.language, props.publisher)}>
              <h4>{props.selectLabel(props.publisher.iri)}</h4>
            </Link>
          </CardTitle>
        </CardBody>
        <ListGroup flush={true}>
          <ListGroupItem>
            {t("publishersDatasets", {
              "count": formatNumber(props.publisher.datasetCount),
            })}
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

PublisherListItem.propTypes = {
  "selectLabel": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
  "publisher": PropTypes.object.isRequired,
};

function getPublisherSearchLink(language, publisher) {
  return createUrl(language, "/datasets", {"publishers": publisher.iri});
}
