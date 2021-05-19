import React, {useContext, useEffect} from "react";
import {Container} from "reactstrap";

import {
  getElement, NavigationContext,
  register, useDatasetDetailApi, useLabelApi,
  usePageTitle, configuration,
} from "../viewer-api";

import translations from "./dataset-detail.json";
import translationsAccess from "./access.json";

const DatasetDetail = () => {
  const selectLabel = useLabelApi();
  const navigation = useContext(NavigationContext);
  const data = useDatasetDetailApi(navigation.query.dataset);

  usePageTitle(
    "page-title.dataset", undefined,
    preparePageTitle(selectLabel(navigation.query.dataset, null)));

  // Scroll up after the page is loaded.
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1);
  }, []);

  if (data.loading) {
    const LoadingView = getElement("application.loading").element;
    return (<LoadingView/>);
  }

  if (data.failed) {
    const FailedView = getElement("application.failed").element;
    return (<FailedView/>);
  }

  const Metadata = getElement("dataset-detail.metadata").element;
  const Header = getElement("dataset-detail.header").element;
  const Body = getElement("dataset-detail.body").element;
  const Parts = getElement("dataset-detail.parts").element;
  const Descendants = getElement("dataset-detail.descendants").element;

  return (
    <Container>
      <Metadata dataset={data.dataset} language={navigation.language}/>
      <Header dataset={data.dataset} language={navigation.language}/>
      <Body dataset={data.dataset} language={navigation.language}/>
      <Parts dataset={data.dataset} language={navigation.language}/>
      <Descendants dataset={data.dataset} language={navigation.language}/>
    </Container>
  );
};

register({
  "url": "/dataset",
  "name": "dataset-detail.view",
  "view": DatasetDetail,
  "navigation": {
    "cs": {
      "/dataset": "/datová-sada",
      "dataset": "iri",
    },
    "en": {
      "/dataset": "/dataset",
      "dataset": "iri",
    },
  },
  "translations": translations,
});

register({
  "name": "dataset-detail.view.access-translations",
  "translations": translationsAccess,
});

function preparePageTitle(label) {
  if (label === null) {
    return undefined;
  }
  return configuration.pageTitlePrefix + label + configuration.pageTitleSuffix;
}
