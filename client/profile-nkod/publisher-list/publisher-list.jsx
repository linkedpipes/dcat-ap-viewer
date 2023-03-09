import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import {
  Container, Card, CardBody, CardTitle,
  ListGroup, ListGroupItem, Row, Badge,
} from "reactstrap";

import {
  t, translateString, register, getElement,
  NavigationContext, usePageTitle, useLabelApi,
  usePublisherListApi, createUrl, formatNumber,
} from "../viewer-api";

import {default as configuration} from "../nkod-configuration";
import {usePublisherVdf} from "./vdf-service";

import translations from "./publisher-list.json";

function PublisherList() {
  const {language} = useContext(NavigationContext);
  const data = usePublisherListApi(language);
  const selectLabel = useLabelApi();
  const [vdfPublishers, vdfOriginators] = usePublisherVdf();
  usePageTitle("page-title.publishers");

  console.log({vdfPublishers, vdfOriginators});

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
            isVdfPublisher={vdfPublishers.includes(publisher.iri)}
            isVdfOriginator={vdfOriginators.includes(publisher.iri)}
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
            <a
              className="pe-2"
              href={getPublisherDashboardLink(props.publisher)}
              target="_blank"
              rel="noopener noreferrer"
              title={translateString(props.language, "publishersDashboard")}
            >
              <i className="material-icons ps-2">line_axis</i>
            </a>
            <a
              className="pe-2"
              href={getPublisherDashboardDetailedLink(props.publisher)}
              target="_blank"
              rel="noopener noreferrer"
              title={translateString(
                props.language, "publishersDashboardDetailed")}
            >
              <i className="material-icons ps-2">query_stats</i>
            </a>
          </ListGroupItem>
          <PublisherListItemVdf
            language={props.language}
            publisher={props.publisher}
            isVdfPublisher={props.isVdfPublisher}
            isVdfOriginator={props.isVdfOriginator}/>
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
  "isVdfPublisher": PropTypes.bool.isRequired,
  "isVdfOriginator": PropTypes.bool.isRequired,
};


function PublisherListItemVdf(props) {
  const vdfBadge = (
    <Link to={getPublisherSearchLinkVdf(props.language, props.publisher)}>
      <Badge color="info" className="mx-1" pill>
        {t("publishersVdfBadge")}
      </Badge>
    </Link>
  );

  const publisherBadge = (
    <Badge color="info" className="mx-1" pill>
      {t("publishersVdfPublisherBadge")}
    </Badge>
  );

  const originatorBadge = (
    <Badge color="info" className="mx-1" pill>
      {t("publishersVdfOriginatorBadge")}
    </Badge>
  );

  if (props.isVdfPublisher && props.isVdfOriginator) {
    return (
      <ListGroupItem>
        {vdfBadge}
        {publisherBadge}
        {originatorBadge}
      </ListGroupItem>
    )
  } else if (props.isVdfPublisher) {
    return (
      <ListGroupItem>
        {vdfBadge}
        {publisherBadge}
      </ListGroupItem>
    )
  } else if (props.isVdfOriginator) {
    return (
      <ListGroupItem>
        {vdfBadge}
        {originatorBadge}
      </ListGroupItem>
    )
  } else {
    return null;
  }
}

function getPublisherSearchLink(language, publisher) {
  return createUrl(language, "/datasets", {"publishers": publisher.iri});
}

function getPublisherDashboardLink(publisher) {
  return configuration.dashboardsUrlTemplate?.replace("{}", publisher.iri);
}

function getPublisherDashboardDetailedLink(publisher) {
  return configuration.dashboardsDetailedUrlTemplate
    ?.replace("{}", publisher.iri);
}

function getPublisherSearchLinkVdf(language, publisher) {
  return createUrl(language, "/datasets",
    {"publishers": publisher.iri, "isVdfPublicData": 1});
}