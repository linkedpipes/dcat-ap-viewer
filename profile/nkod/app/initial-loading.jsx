import React from "react";
import {Container} from "reactstrap";
import {
  register,
  ELEMENT_INITIAL_LOADING,
} from "./../../../client/app/component-api";
import {PropTypes} from "prop-types";

// In this component no translation is loaded, so we need
// to take all strings with us.
const TRANSLATIONS = {
  "cs": {
    "initial_loading": "Načítám základní data ...",
    "initial_loading_failed": "Nepodařilo se načíst základní data.",
  },
  "en": {
    "initial_loading": "Loading initial data ...",
    "initial_loading_failed": "Initial loading failed.",
  },
};

function InitialLoading({lang, failed}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  return (
    <Container style={{"textAlign": "center"}}>
      <br/>
      <h1>{t["initial_loading"]}</h1>
      <br/>
      {failed && (
        <div>
          {t["initial_loading_failed"]}
        </div>
      )}
      <br/>
    </Container>
  )
}

InitialLoading.propTypes = {
  "lang": PropTypes.string.isRequired,
  "failed": PropTypes.bool.isRequired,
};

register({
  "name": ELEMENT_INITIAL_LOADING,
  "element": InitialLoading,
});
