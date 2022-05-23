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
import ConformsTo from "./access/data-service-conforms-to-item";

function PartDataService(props) {
  const selectLabel = useLabelApi();
  const dataServiceQuality = useQualityApi(props.part.dataService);
  const LegalColumn = getElement("dataset-detail.parts.legal-column").element;
  const EndpointUrl = getElement("dataset-detail.parts.endpoint-url").element;
  return (
    <Card className="flex-fill">
      <CardBody>
        {renderPartTitle(selectLabel, props.part)}
        {renderPartFormat(selectLabel, props.part)}
      </CardBody>
      <Row className="pb-2">
        <Col xs="6" className="ps-4 pe-1">
          <LegalColumn
            distribution={props.part}
            quality={props.quality}
          />
        </Col>
        <Col xs="6" className="ps-1 pe-4">
          <Card>
            <CardTitle tag="h6" className="text-muted ps-2 pt-2">
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
                language={props.language}
                distribution={props.part} quality={props.quality}
                selectLabel={selectLabel}
              />
              <CompressFormat
                language={props.language}
                distribution={props.part}
                selectLabel={selectLabel}
              />
              <PackageFormat
                language={props.language}
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
  "language": PropTypes.string.isRequired,
  "iri": PropTypes.string.isRequired,
  "part": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

register({
  "name": "dataset-detail.parts.data-service",
  "element": PartDataService,
});

function renderPartTitle(selectLabel, dataService) {
  let label = selectLabel(dataService.iri, null);
  if (label === null) {
    label = selectLabel(dataService.dataService, null);
  }
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
