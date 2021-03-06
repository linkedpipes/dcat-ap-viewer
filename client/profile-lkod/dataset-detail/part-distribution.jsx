import React from "react";
import {PropTypes} from "prop-types";
import {
  Card, CardBody, Row, Col, CardTitle, CardSubtitle, ListGroup,
} from "reactstrap";

import {t, register, useLabelApi, getElement} from "../viewer-api";
import DownloadListItem from "./access/download-list-item";
import MediaTypeItem from "./access/media-type-item";
import CompressFormat from "./access/compress-format-item";
import PackageFormat from "./access/package-format-item";
import ConformsTo from "./access/distribution-conforms-to-item";

function PartDistribution(props) {
  const selectLabel = useLabelApi();
  const LegalColumn = getElement("dataset-detail.parts.legal-column").element;
  return (
    <Card className="flex-fill">
      <CardBody>
        {renderPartTitle(selectLabel, props.iri)}
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
              {t("distributionAccess")}
            </CardTitle>
            <ListGroup flush={true}>
              <DownloadListItem
                distribution={props.part} quality={props.quality}
              />
              <ConformsTo
                distribution={props.part} quality={props.quality}
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

PartDistribution.propTypes = {
  "language": PropTypes.string.isRequired,
  "iri": PropTypes.string.isRequired,
  "part": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

register({
  "name": "dataset-detail.parts.distribution",
  "element": PartDistribution,
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

function renderPartFormat(selectLabel, distribution) {
  const label = selectLabel(distribution.format, null);
  if (label === null) {
    return null;
  }
  return (
    <CardSubtitle tag="h6" className="mb-2 text-muted">
      {label}
    </CardSubtitle>
  );
}
