import React from "react";
import {Container} from "reactstrap";
import {getString} from "../app-services/strings";
import {NavLink} from "react-router-dom";
import {getUrl, DATASET_LIST_URL} from "../app/navigation";

export const PageNotFound = () => (
    <Container style={{"textAlign": "center"}}>
        <h1>{getString("404_title")}</h1>
        <p>
            {getString("404_text_before")}
            <NavLink to={getUrl(DATASET_LIST_URL)}>
                {getString("404_link")}
            </NavLink>
            {getString("404_text_after")}
        </p>
    </Container>
);