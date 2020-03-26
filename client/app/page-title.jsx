import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {selectUrl, selectT} from "./navigation";
import {selectTLabel} from "./../labels";
import {
  getGlobal,
  PAGE_TITLE_DEFAULT,
  PAGE_TITLE_PREFIX,
  PAGE_TITLE_SUFFIX,
} from "./globals";
import {
  URL_DATASET_LIST,
  URL_DATASET_DETAIL,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_DETAIL_IRI,
} from "./component-list";

const titleDefault = getGlobal(PAGE_TITLE_DEFAULT);
const titlePrefix = getGlobal(PAGE_TITLE_PREFIX);
const titleSuffix = getGlobal(PAGE_TITLE_SUFFIX);

function PageTitle({t, tLabel, url}) {
  document.title = getTitle(t, tLabel, url);
  return null;
}

PageTitle.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "url": PropTypes.object.isRequired,
};

export default connect((state) => ({
  "t": selectT(state),
  "tLabel": selectTLabel(state),
  "url": selectUrl(state),
}))(PageTitle);

function getTitle(t, tLabel, url) {
  let title = undefined;
  // Handling of special cases.
  if (url.path === URL_DATASET_LIST) {
    let iri = getIriForDatasetList(url);
    title = iri ? tLabel(iri) : undefined;
    if (title !== undefined) {
      return title + titleSuffix;
    }
  } else if (url.path === URL_DATASET_DETAIL) {
    const dataset = url.query[QUERY_DATASET_DETAIL_IRI];
    title = tLabel(dataset);
    if (title !== undefined) {
      return title + titleSuffix;
    }
  }
  // Default.
  title = t(url.path);
  if (title === undefined) {
    title = titleDefault;
  } else {
    title = titlePrefix + title + titleSuffix;
  }
  return title;
}

function getIriForDatasetList(url) {
  if (url.query[QUERY_DATASET_LIST_FORMAT] !== undefined) {
    return undefined;
  }
  const values = [
    ...asArray(url.query[QUERY_DATASET_LIST_PUBLISHER]),
    ...asArray(url.query[QUERY_DATASET_LIST_THEME]),
    ...asArray(url.query[QUERY_DATASET_LIST_KEYWORD]),
  ];
  if (values.length === 1) {
    return values[0];
  } else {
    return undefined;
  }
}

function asArray(value) {
  if (value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}
