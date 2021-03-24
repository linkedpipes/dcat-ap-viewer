import React, {useCallback} from "react";
import {PropTypes} from "prop-types";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";

import {t, useLabelApi, formatNumber} from "../../viewer-api";
import TagLine from "../../components/tag-line";

const SORT_OPTIONS = ["title asc", "title desc"];

export default function DatasetsViewHeader(props) {

  const labelSelector = useLabelApi();

  const {onUpdateQuery} = props;
  const setSort = useCallback((value) => {
    onUpdateQuery({"sort": value});
  }, [onUpdateQuery]);
  
  return (
    <Row>
      <Col xs={12} md={9}>
        <h4>
          {t("query.datasetsFound", {
            "count": formatNumber(props.state.datasetsCount),
          })}
          <SearchText search={props.query.search}/>
        </h4>
        <TagLine
          items={props.query.publishers}
          labelFunction={labelSelector}
        />
        <TagLine
          items={props.query.themes}
          labelFunction={labelSelector}
        />
        <TagLine
          items={props.query.keywords}
          labelFunction={code => code}
        />
        <TagLine
          items={props.query.formats}
          labelFunction={labelSelector}
        />
      </Col>
      <Col xs={12} md={3}>
        <SortSelector
          value={props.query.sort}
          onChange={setSort}
        />
      </Col>
    </Row>
  );
}

DatasetsViewHeader.propTypes = {
  "state": PropTypes.shape({
    "datasetsCount": PropTypes.number.isRequired,
  }).isRequired,
  "query": PropTypes.shape({
    "publishers": PropTypes.arrayOf(PropTypes.string).isRequired,
    "themes": PropTypes.arrayOf(PropTypes.string).isRequired,
    "keywords": PropTypes.arrayOf(PropTypes.string).isRequired,
    "formats": PropTypes.arrayOf(PropTypes.string).isRequired,
    "sort": PropTypes.string.isRequired,
    "search": PropTypes.string.isRequired,
  }).isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
};

function SearchText({search}) {
  if (search === undefined || search === "") {
    return null;
  }
  return (
    <React.Fragment>
      {t("query.with")}
      {": \"" + search + "\""}
    </React.Fragment>
  );
}

SearchText.propTypes = {
  "search": PropTypes.string,
};

function SortSelector({value, onChange}) {
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
  "value": PropTypes.string.isRequired,
  "onChange": PropTypes.func.isRequired,
};
