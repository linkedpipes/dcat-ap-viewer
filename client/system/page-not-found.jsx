import React from "react";
import {Container} from "reactstrap";
import {getString} from "../application/strings";
import {Link} from "react-router";
import {getUrl, DATASET_LIST_URL} from "../application/navigation";

export const PageNotFound = () => (
    <Container style={{"textAlign": "center"}}>
        <h3>{getString("s.404_title")}</h3>
        <p>
            {getString("s.404_text_before")}
            <Link to={getUrl(DATASET_LIST_URL)}>{getString("s.404_link")}</Link>
            {getString("s.404_text_after")}
        </p>
    </Container>
);