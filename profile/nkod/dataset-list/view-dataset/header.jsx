import React from "react";
import {PropTypes} from "prop-types";
import TagLine from "../../user-iterface/tag-line";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";

export default function DatasetsViewHeader(
  {t, tLabel, query, datasetsCount, onSortSet}) {
  //
  return (
    <Row>
      <Col xs={12} md={9}>
        <h4>
          {t("query.datasetsFound", {"count": datasetsCount})}
          {
            query["search"] !== "" &&
            t("query.with") + ": \"" + query["search"] + "\""
          }
        </h4>
        <TagLine items={query["publisher"]} labelFunction={tLabel}/>
        <TagLine items={query["theme"]} labelFunction={tLabel}/>
        <TagLine items={query["keyword"]}/>
        <TagLine items={query["format"]} labelFunction={tLabel}/>
      </Col>
      <Col xs={12} md={3}>
        <SortSelector
          t={t}
          value={query["sort"]}
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
  "datasetsCount": PropTypes.number.isRequired,
  "onSortSet": PropTypes.func.isRequired,
};

const SORT_OPTIONS = ["title asc", "title desc"];

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
  );
}

SortSelector.propTypes = {
  "t": PropTypes.func.isRequired,
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string.isRequired,
};
