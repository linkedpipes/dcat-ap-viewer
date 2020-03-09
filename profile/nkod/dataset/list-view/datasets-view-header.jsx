import React from "react";
import {PropTypes} from "prop-types";
import TagLine from "../../user-iterface/tag-line";
import {formatNumber} from "../../utils";
import {
  getGlobal,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_SORT,
  QUERY_DATASET_LIST_SEARCH,
} from "../../../client-api";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";

export default function DatasetsViewHeader(
  {t, tLabel, query, datasetCount, onSortSet}) {
  //
  return (
    <Row>
      <Col xs={12} md={9}>
        <h4>
          {formatNumber(datasetCount)} {t("query.datasets_found")}
          {
            query[QUERY_DATASET_LIST_SEARCH] &&
            t("query.with") + ": \"" + query[QUERY_DATASET_LIST_SEARCH] + "\""
          }
        </h4>
        <TagLine
          items={
            query[QUERY_DATASET_LIST_PUBLISHER] ?
              query[QUERY_DATASET_LIST_PUBLISHER] : []
          }
          labelFunction={tLabel}
        />
        <TagLine
          items={
            query[QUERY_DATASET_LIST_THEME] ?
              query[QUERY_DATASET_LIST_THEME] : []
          }
          labelFunction={tLabel}
        />
        <TagLine
          items={
            query[QUERY_DATASET_LIST_KEYWORD]
              ? query[QUERY_DATASET_LIST_KEYWORD] : []
          }
        />
        <TagLine
          items={
            query[QUERY_DATASET_LIST_FORMAT]
              ? query[QUERY_DATASET_LIST_FORMAT] : []
          }
          labelFunction={tLabel}
        />
      </Col>
      <Col xs={12} md={3}>
        <SortSelector
          t={t}
          value={
            query[QUERY_DATASET_LIST_SORT] ?
              query[QUERY_DATASET_LIST_SORT][0] :
              getGlobal("dataset-list-sort-default")
          }
          onChange={onSortSet}
        />
      </Col>
    </Row>
  );
}

DatasetsViewHeader.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
  "datasetCount": PropTypes.number.isRequired,
  "onSortSet": PropTypes.func.isRequired,
};

const SORT_OPTIONS = getGlobal("dataset-list-sort") || [
  "title asc",
  "title desc",
];

function SortSelector({t, value, onChange}) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        {t(value)}
      </DropdownToggle>
      <DropdownMenu>
        {
          SORT_OPTIONS
            .filter(item => item !== value)
            .map(item => (
              <DropdownItem key={item} onClick={() => onChange(item)}>
                {t(item)}
              </DropdownItem>
            ))
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

SortSelector.propTypes = {
  "t": PropTypes.func.isRequired,
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string.isRequired,
};



