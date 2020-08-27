import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {
  register,
  getRegisteredElement,
  selectT,
  selectTUrl,
  selectTLabel,
  URL_DATASET_LIST,
} from "../../client-api";
import {
  Status,
  fetchKeywordList,
  keywordListSelector,
  ELEMENT_KEYWORD_LIST,
} from "../../../client/keyword-list";

import TagCloud from "../user-iterface/tag-cloud";
import {STATUS_FAILED, STATUS_LOADING} from "../nkod-component-names";

const KeywordList = () => {
  const dispatch = useDispatch();
  const t = useSelector(selectT);
  const tLabel = useSelector(selectTLabel);
  const tUrl = useSelector(selectTUrl);
  const data = useSelector(keywordListSelector);
  useEffect(() => {
    if (data.status === Status.Undefined) {
      dispatch(fetchKeywordList());
    }
  }, []);
  //
  const LoadingView = getRegisteredElement(STATUS_LOADING);
  const FailedView = getRegisteredElement(STATUS_FAILED);
  switch(data.status) {
  case Status.Undefined:
  case Status.Loading:
    return (<LoadingView/>);
  case Status.Failed:
    return (<FailedView/>);
  case Status.Ready:
    return keywordListView(t, tLabel, tUrl, data.keywords);
  default:
    return null;
  }
};

function keywordListView(t, tLabel, tUrl, keywords) {
  const tags = convertKeywordsToTags(tLabel, tUrl, keywords);
  return (
    <div className="container p-3">
      <h4>
        {t("keywords")}
      </h4>
      <hr/>
      <TagCloud tags={tags} renderFunction={renderTag}/>
    </div>
  );
}

function convertKeywordsToTags(tLabel, tUrl, keywords) {
  return keywords.map(item => {
    const label = tLabel(item.iri);
    return {
      "key": item.iri,
      "label": label,
      "count": item.usedByPublisherCount,
      "url": tUrl(URL_DATASET_LIST, {"keyword": label}),
    };
  });
}

function renderTag(tag, size, color) {
  const style = {
    "marginLeft": "1rem",
    "verticalAlign": "middle",
    "display": "inline-block",
  };
  return (
    <span className="tag-cloud-tag" style={style} key={tag.key}>
      <Link to={tag.url} className="tag-cloud-tag">
        <span style={{"color": color, "fontSize": size}}>
          {tag.label}
        </span>
      </Link>
    </span>
  );
}

register({
  "name": ELEMENT_KEYWORD_LIST,
  "element": KeywordList,
});
