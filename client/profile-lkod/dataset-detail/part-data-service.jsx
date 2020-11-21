import React from "react";
import {PropTypes} from "prop-types";
import {
  Card, Row, Col, CardTitle, CardSubtitle, ListGroup, CardBody,
} from "reactstrap";

import {
  t, register, useLabelApi, getElement, useQualityApi,
} from "../viewer-api";
import MediaTypeItem from "./access/media-type-item";
import CompressFormat from "./access/compress-format-item";
import PackageFormat from "./access/package-format-item";
import EndpointDescription from "./access/endpoint-description-item";
import EndpointUrl from "./access/endpoint-url-item";
import ConformsTo from "./access/data-service-conforms-to-item";

function PartDataService(props) {
  const selectLabel = useLabelApi();
  const dataServiceQuality = useQualityApi(props.part.dataService);
  const LegalColumn = getElement("dataset-detail.parts.legal-column").element;
  return (
    <Card>
      <CardBody>
        {renderPartTitle(selectLabel, props.iri)}
        {renderPartFormat(selectLabel, props.part)}
      </CardBody>
      <Row className="pb-2">
        <Col xs="6" className="pl-4 pr-1">
          <LegalColumn
            distribution={props.part}
            quality={props.quality}
          />
        </Col>
        <Col xs="6" className="pl-1 pr-4">
          <Card>
            <CardTitle tag="h6" className="text-muted pl-2 pt-2">
              {t("dataServiceAccess")}
            </CardTitle>
            <ListGroup flush={true}>
              <EndpointDescription
                dataService={props.part} quality={dataServiceQuality}
              />
              <EndpointUrl
                dataService={props.part} quality={dataServiceQuality}
              />
              <ConformsTo
                dataService={props.part} quality={dataServiceQuality}
              />
              <MediaTypeItem
                distribution={props.part} quality={props.quality}
                selectLabel={selectLabel}
              />
              <CompressFormat
                distribution={props.part}
                selectLabel={selectLabel}
              />
              <PackageFormat
                distribution={props.part}
                selectLabel={selectLabel}
              />
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

PartDataService.propTypes = {
  "iri": PropTypes.string.isRequired,
  "part": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

register({
  "name": "dataset-detail.parts.data-service",
  "element": PartDataService,
});

function renderPartTitle(selectLabel, iri) {
  const label = selectLabel(iri, null);
  if (label === null) {
    return null;
  }
  return (
    <CardTitle tag="h5">
      {label}
    </CardTitle>
  );
}

function renderPartFormat(selectLabel, dataService) {
  const label = selectLabel(dataService.format, null);
  if (label === null) {
    return null;
  }
  return (
    <CardSubtitle tag="h6" className="mb-2 text-muted">
      {label}
    </CardSubtitle>
  );
}
