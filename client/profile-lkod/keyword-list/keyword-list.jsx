import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";

import {
  t, tLiteral, tUrl, register, useKeywordsListApi, getElement,
  NavigationContext, usePageTitle,
} from "../viewer-api";
import TagCloud from "../components/tag-cloud";

import translations from "./keyword-list.json";
import "./keyword-list.css";

const KeywordList = () => {
  const {language} = useContext(NavigationContext);
  const data = useKeywordsListApi(language);
  usePageTitle("page-title.keywords");

  if (data.loading) {
    const LoadingView = getElement("application.loading").element;
    return (<LoadingView/>);
  }
  if (data.failed) {
    const FailedView = getElement("application.failed").element;
    return (<FailedView/>);
  }
  const tags = keywordsToTags(data.keywords);
  return (
    <Container className="p-3">
      <h4>
        {t("keywords.title", {"count": data.keywords.length})}
      </h4>
      <hr/>
      <TagCloud tags={tags} renderFunction={renderTag}/>
    </Container>
  );
};

function keywordsToTags(keywords) {
  return keywords.map(keyword => ({
    "code": keyword.code,
    "title": keyword.title,
    "count": keyword.usedByPublisherCount,
    "color": keyword.color,
  }));
}

function renderTag(tag, size, color) {
  return (
    <span className="tag-cloud-tag" key={tag.code}>
      {tUrl("/datasets", {"keywords": tag.code}, (url) => (
        <Link to={url}>
          <span style={{"color": color, "fontSize": size}}>
            {tLiteral(tag.title)}
          </span>
        </Link>
      ))}
    </span>
  );
}

register({
  "url": "/keywords",
  "name": "keyword-list.view",
  "view": KeywordList,
  "navigation": {
    "cs": {
      "/keywords": "/klíčová-slova",
    },
    "en": {
      "/keywords": "/keywords",
    },
  },
  "translations": translations,
});
