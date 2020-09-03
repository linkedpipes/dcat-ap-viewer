import React from "react";
import {Container} from "reactstrap";
import {
  register,
  ELEMENT_INITIAL_LOADING,
} from "./../../client-api";
import {PropTypes} from "prop-types";

// In this component no translation is loaded, so we need
// to take all strings with us.
const TRANSLATIONS = {
  "cs": {
    "initialLoading": "Načítám základní data ...",
    "initialLoadingFailed": "Nepodařilo se načíst základní data.",
  },
  "en": {
    "initialLoading": "Loading initial data ...",
    "initialLoadingFailed": "Initial loading failed.",
  },
};

function InitialLoading({lang, failed}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  return (
    <Container style={{"textAlign": "center"}}>
      <br/>
      <h1>{t["initialLoading"]}</h1>
      <br/>
      {failed && (
        <div>
          {t["initialLoadingFailed"]}
        </div>
      )}
      <br/>
    </Container>
  );
}

InitialLoading.propTypes = {
  "lang": PropTypes.string.isRequired,
  "failed": PropTypes.bool.isRequired,
};

register({
  "name": ELEMENT_INITIAL_LOADING,
  "element": InitialLoading,
});
