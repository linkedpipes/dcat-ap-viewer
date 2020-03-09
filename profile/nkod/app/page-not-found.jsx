import React from "react";
import {Container} from "reactstrap";
import {NavLink} from "react-router-dom";
import {
  selectT,
  selectTUrl,
  register,
  ELEMENT_PAGE_NOT_FOUND,
  ELEMENT_DATASET_LIST,
} from "./../../../client/app/component-api";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";

const PageNotFound = ({t, tUrl}) => (
  <Container style={{"textAlign": "center"}}>
    <h1>{t("404_title")}</h1>
    <br/>
    {tUrl(ELEMENT_DATASET_LIST) &&
    <p>
      {t("404_text_before")}
      <NavLink to={tUrl(ELEMENT_DATASET_LIST)}>
        {t("404_link")}
      </NavLink>
      {t("404_text_after")}
    </p>
    }
  </Container>
);

PageNotFound.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
};

register({
  "name": ELEMENT_PAGE_NOT_FOUND,
  "element": connect((state) => ({
    "t": selectT(state),
    "tUrl": selectTUrl(state),
  }))(PageNotFound),
});
