import React from "react";
import {Container} from "reactstrap";

import {t, Namespace, register} from "../viewer-api";
import translations from "./page-not-found.json";

const PageNotFound = () => (
  <Namespace.Provider value="page-not-found">
    <Container style={{"textAlign": "center"}}>
      <h4>{t("title")}</h4>
      <br/>
    </Container>
  </Namespace.Provider>
);

register({
  "name": "view.page-not-found",
  "element": PageNotFound,
  "translations": translations,
  "translationsNamespace": "page-not-found",
});
